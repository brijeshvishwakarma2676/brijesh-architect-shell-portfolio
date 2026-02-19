export const projects = [
  {
    id: 1,
    slug: 'realtime-messaging',
    title: 'Real-time Messaging & Notification Platform',
    tagline: 'Distributed messaging system with delivery guarantees, ordering, and multi-channel notifications.',
    summary: 'A backend-first messaging platform built to handle high-throughput real-time communication with reliability guarantees typically expected in production chat systems.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSocket', 'RabbitMQ', 'React'],
    
    problemStatement: `Most messaging implementations focus on the happy path—two users exchanging messages in real-time. The hard problems emerge when you consider: What happens when a user is offline? How do you guarantee message ordering across distributed servers? How do you handle network failures mid-delivery? How do you scale read-heavy operations like fetching chat history?

This project was built to solve these problems systematically, not to replicate a UI.`,

    technicalHighlights: [
      {
        title: 'Message Delivery Guarantees',
        description: 'Implemented at-least-once delivery with client-side deduplication using message UUIDs. The server acknowledges receipt, and clients retry with exponential backoff until acknowledged. This prevents message loss during network failures without requiring exactly-once semantics, which would add significant complexity.',
        code: `
# Message delivery acknowledgement handler
@router.post("/messages/{message_id}/ack")
async def acknowledge_message(
    message_id: UUID,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Idempotent ack logic
    stmt = update(MessageReceipt).where(
        MessageReceipt.message_id == message_id,
        MessageReceipt.user_id == user.id
    ).values(status="delivered", delivered_at=func.now())
    await db.execute(stmt)
    await db.commit()
`
      },
      {
        title: 'Message Ordering',
        description: 'Used server-assigned monotonic timestamps per conversation, not client timestamps. Messages are ordered by (conversation_id, server_timestamp) tuple. Clients reorder their local buffer on each fetch to handle out-of-order WebSocket delivery.',
      },
      {
        title: 'Online/Offline State Management',
        description: 'Presence tracked via Redis with TTL-based expiry. Heartbeats extend the TTL. When a WebSocket disconnects, presence expires naturally after 30 seconds rather than requiring explicit cleanup—handles crash scenarios gracefully.',
      },
      {
        title: 'Read Receipts & Typing Indicators',
        description: 'Read receipts are persisted (write-heavy, batched). Typing indicators are ephemeral, broadcast-only via pub/sub—no persistence, no history. This distinction keeps the database lean while providing real-time feedback.',
      },
      {
        title: 'Notification Fallback Chain',
        description: 'If user is offline for > 2 minutes, push notification is queued. If push fails, email is sent. If email fails, it is logged for retry. Each channel has independent retry logic and failure tracking.',
      },
    ],

    architectureDescription: `The system follows a layered architecture:

1. **API Layer**: FastAPI handles HTTP requests for auth, chat history, and user management.
2. **WebSocket Gateway**: Dedicated connection manager handling real-time message delivery and presence.
3. **Message Queue**: RabbitMQ decouples message ingestion from delivery, enabling async processing.
4. **Persistence Layer**: PostgreSQL stores messages, conversations, and user data. Redis handles ephemeral state (presence, typing).
5. **Notification Service**: Separate worker process consuming from the queue, handling push/email delivery.`,

    databaseConsiderations: `Key tables: users, conversations, conversation_members, messages, read_receipts.

The messages table is partitioned by conversation_id for query performance. Indexes on (conversation_id, created_at DESC) enable efficient pagination. Read receipts use a composite primary key (user_id, message_id) to prevent duplicates.

Avoided the temptation to denormalize unread counts into the conversations table—calculating on read is fast enough with proper indexes and simpler to maintain.`,

    keyDecisions: [
      {
        context: 'Needed to decide how to handle message delivery confirmation given unreliable networks.',
        options: [
          'Exactly-once delivery with distributed transactions',
          'At-least-once delivery with client-side deduplication',
        ],
        decision: 'At-least-once delivery with client-side deduplication',
        reasoning: 'Exactly-once requires distributed transactions or complex saga patterns, adding latency and failure modes. At-least-once with idempotent clients is simpler, faster, and good enough for messaging where duplicate detection is cheap (UUID check).',
        downside: 'Clients need to handle deduplication. Edge case where very old duplicates might slip through if client state is lost.',
      },
      {
        context: 'Message ordering strategy—client timestamps vs server timestamps.',
        options: [
          'Use client-provided timestamps for ordering',
          'Use server-assigned timestamps exclusively',
        ],
        decision: 'Server-assigned timestamps',
        reasoning: 'Client clocks drift, can be manipulated, and create ordering ambiguity across devices. Server timestamps provide a single source of truth, even if they add a few milliseconds of latency.',
        downside: 'Messages appear "sent" slightly after the user pressed send. Requires careful UX to handle optimistic updates.',
      },
      {
        context: 'Whether to store typing indicators.',
        options: [
          'Persist typing state to database',
          'Ephemeral broadcast via pub/sub only',
        ],
        decision: 'Ephemeral broadcast only',
        reasoning: 'Typing indicators are inherently transient. Persisting them adds writes with zero value—no one cares who was typing yesterday. Pub/sub with TTL handles it cleanly.',
        downside: 'If a user refreshes, they lose the "typing" state of others until the next broadcast. Acceptable tradeoff.',
      },
    ],

    failures: [
      {
        title: 'WebSocket Connection Storm After Deploy',
        whatBroke: 'After a routine deployment, all connected clients attempted to reconnect simultaneously, overwhelming the WebSocket gateway and causing cascading failures.',
        whyBroke: 'The deployment strategy killed all existing connections at once. Clients had aggressive reconnection with no jitter.',
        impact: 'Approximately 3 minutes of message delivery delays. Some users saw duplicate messages due to retry logic kicking in.',
        fix: 'Implemented rolling deployments for the WebSocket service. Added randomized jitter (0-5 seconds) to client reconnection logic. Added connection rate limiting per IP.',
        learned: 'Reconnection storms are a real failure mode. Jitter is not optional in distributed systems. Load testing should include reconnection scenarios, not just new connections.',
      },
    ],

    tradeoffs: [
      'Chose PostgreSQL over dedicated message stores like Cassandra. Simpler operations, sufficient for expected scale, easier to query for features like search.',
      'No end-to-end encryption implemented. Would require significant client-side key management. Out of scope for this iteration.',
      'Message history limited to 90 days with archival. Keeps active tables lean, simplifies GDPR compliance.',
    ],

    futureImprovements: [
      'Add message threading/replies with proper parent references.',
      'Implement proper rate limiting per conversation to prevent spam.',
      'Add support for message reactions with efficient aggregation.',
      'Consider read-replica routing for chat history fetches.',
    ],

    rebuildingToday: `If rebuilding today, I would:

1. **Start with fewer features**: Skip typing indicators and read receipts for v1. They add complexity without core value.
2. **Use a managed WebSocket service** (like AWS API Gateway WebSocket) instead of self-managing connection state. The ops overhead of WebSocket servers is underestimated.
3. **Delay notification fallback chain** until there is actual user demand. Building email/push integration upfront was premature.
4. **Design for horizontal scaling earlier** by sharding conversations across Redis clusters from day one, not retrofitting later.`,
  },

  {
    id: 2,
    slug: 'social-platform',
    title: 'Content-Driven Social Platform',
    tagline: 'Feed generation, content modeling, and scalable API design for social interactions.',
    summary: 'A social content platform focused on the backend challenges: efficient feed generation, privacy-aware content access, and high-read scalability patterns.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'React'],

    problemStatement: `Social platforms are deceptively simple on the surface—users post content, others see it. The complexity hides in: How do you generate feeds for millions of users without N+1 queries? How do content privacy settings propagate? How do you paginate infinite scroll without missing or duplicating posts? How do you handle the write amplification of a viral post?

This project explores these problems with a realistic data model and API design.`,

    technicalHighlights: [
      {
        title: 'Feed Generation Strategy',
        description: 'Hybrid approach: fanout-on-write for users with < 1000 followers, fanout-on-read for larger accounts. Cache recent feeds in Redis with 5-minute TTL. This balances write amplification against read latency.',
        code: `
# Hybrid feed generation logic
async def get_user_feed(user_id: int, db: Session):
    # Check Redis for pre-computed feed (fanout-on-write)
    cached_feed = await redis.get(f"feed:{user_id}")
    if cached_feed:
        return json.loads(cached_feed)
    
    # Fallback to fanout-on-read for large following counts
    # or if cache is cold
    query = (
        select(Post)
        .join(Follow, Post.author_id == Follow.following_id)
        .where(Follow.follower_id == user_id)
        .order_by(Post.created_at.desc())
        .limit(20)
    )
    return await db.execute(query)
`
      },
      {
        title: 'Content Visibility Rules',
        description: 'Posts have visibility levels: public, followers-only, close-friends, private. Every content fetch joins against a visibility check—either you follow the author, you are in their close friends list, or the post is public. Indexed properly to avoid full scans.',
      },
      {
        title: 'Pagination Strategy',
        description: 'Cursor-based pagination using (created_at, post_id) tuples instead of offset. Prevents duplicate/missing posts during infinite scroll when new content is added. The cursor is opaque to the client (base64-encoded).',
      },
      {
        title: 'Avoiding N+1 Queries',
        description: 'Feed endpoints use batch loading for related data: authors, like counts, comment previews loaded in bulk. SQLAlchemy selectinload and subqueryload used strategically based on relationship cardinality.',
      },
      {
        title: 'Notification Triggers',
        description: 'Likes and comments trigger Celery tasks for notification creation. Tasks are idempotent (keyed by actor + action + target). Notifications batched for serial actions (10 likes become "10 people liked your post").',
      },
    ],

    architectureDescription: `The platform has three main services:

1. **API Service**: Handles all HTTP requests, authentication, content CRUD, and feed fetching.
2. **Worker Service**: Celery workers processing background tasks—fanout writes, notification generation, media processing.
3. **Cache Layer**: Redis storing hot feeds, session data, and rate limiting counters.

All services share the PostgreSQL database but have distinct connection pools tuned for their workload (API: more connections, shorter queries; Workers: fewer connections, longer transactions).`,

    databaseConsiderations: `Core tables: users, posts, follows, likes, comments, notifications.

The follows table uses (follower_id, following_id) as a composite primary key. The feed query for fanout-on-read users joins posts with follows and filters by visibility—this query is heavily indexed.

Like counts are denormalized onto the posts table and updated via triggers. The alternative (COUNT queries) became too slow past 10K likes per post.

Soft deletes on posts and comments to support undo and moderation history.`,

    keyDecisions: [
      {
        context: 'Feed generation creates massive write amplification for popular accounts.',
        options: [
          'Fanout-on-write for all users',
          'Fanout-on-read for all users',
          'Hybrid approach based on follower count',
        ],
        decision: 'Hybrid approach based on follower count',
        reasoning: 'Pure fanout-on-write means a user with 100K followers creates 100K writes per post. Pure fanout-on-read makes every feed fetch expensive. Hybrid gives us the best of both—fast reads for most users, controlled writes for everyone.',
        downside: 'Two code paths to maintain. Edge cases where a user crosses the threshold mid-session.',
      },
      {
        context: 'How to handle like counts at scale.',
        options: [
          'Compute on read with COUNT(*)',
          'Denormalize into posts table',
          'Use Redis for real-time counts with periodic sync',
        ],
        decision: 'Denormalize into posts table with trigger-based updates',
        reasoning: 'COUNT(*) became unacceptable past 10K likes. Redis adds operational complexity and sync issues. Triggers are simple, reliable, and keep the data in one place.',
        downside: 'Slight write overhead on every like/unlike. Need to handle race conditions in high-concurrency scenarios.',
      },
      {
        context: 'Pagination approach for infinite scroll feeds.',
        options: [
          'Offset-based pagination',
          'Cursor-based pagination',
        ],
        decision: 'Cursor-based pagination',
        reasoning: 'Offset pagination breaks when new posts are added—users see duplicates or miss content. Cursor pagination maintains position correctly regardless of insertions.',
        downside: 'Cannot jump to arbitrary page numbers. Client must traverse sequentially. Acceptable for feed UX.',
      },
    ],

    failures: [
      {
        title: 'Infinite Scroll Showing Duplicate Posts',
        whatBroke: 'Users reported seeing the same posts multiple times while scrolling their feed.',
        whyBroke: 'The original implementation used offset-based pagination. When new posts were added (which happens constantly), the offset shifted, causing already-seen posts to reappear.',
        impact: 'Degraded user experience. Support tickets about "buggy" feed. Took 2 weeks to properly fix due to client-side state implications.',
        fix: 'Migrated to cursor-based pagination. Updated all clients to pass cursor tokens instead of page numbers. Added a fallback for old clients during transition.',
        learned: 'Offset pagination is fundamentally broken for dynamic content. Should have implemented cursor from the start. Migration across mobile apps is painful—version carefully.',
      },
    ],

    tradeoffs: [
      'No full-text search on posts. Would require Elasticsearch or similar. Deferred to avoid operational overhead.',
      'Comments are flat, not threaded. Threading adds significant complexity in ordering and pagination. Simpler model serves most use cases.',
      'No support for post editing. Simplifies the data model and avoids "edited" history tracking.',
    ],

    futureImprovements: [
      'Add support for post collections/saves with user-defined categories.',
      'Implement proper content recommendation beyond chronological.',
      'Add abuse detection and automated content moderation.',
      'Consider event sourcing for activity history and analytics.',
    ],

    rebuildingToday: `If rebuilding today, I would:

1. **Skip the hybrid feed complexity initially**. Start with pure fanout-on-read and optimize only when metrics prove it is necessary.
2. **Use a dedicated feed service** (like Stream or Getstream) rather than building from scratch. The problem is well-understood and commoditized.
3. **Implement better content indexing from day one**. The lack of search became a genuine user pain point.
4. **Design for content archival earlier**. Posts older than 6 months are rarely accessed but bloat the primary database.`,
  },

  {
    id: 3,
    slug: 'eligibility-system',
    title: 'Eligibility & Appointment Management System',
    tagline: 'Complex rule evaluation, multi-member scheduling, and partial state handling.',
    summary: 'An enterprise scheduling system handling nuanced eligibility rules, multi-party appointments, cancellations, and partial payments across organizational hierarchies.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'React'],

    problemStatement: `Appointment scheduling in enterprise contexts is not just about finding open slots. You need to evaluate eligibility rules that depend on user attributes, membership status, prior appointments, and organizational policies. Then you handle multi-member bookings where some members are eligible and others are not. Then cancellations with refund logic. Then rescheduling with carryover payments.

This system was built to handle real-world scheduling complexity, not the "book a slot" happy path.`,

    technicalHighlights: [
      {
        title: 'Complex Eligibility Rules Engine',
        description: 'Rules are defined as JSON schemas specifying conditions (membership tier, age range, prior appointment count, cooldown periods). The engine evaluates rules lazily, short-circuiting on first failure. Results include both pass/fail and detailed failure reasons.',
        code: `
# Rule evaluation engine snippet
def evaluate_rule(user_context: dict, rule_schema: dict) -> EvaluationResult:
    for condition in rule_schema['conditions']:
        operator = condition['op']  # gte, lte, in, etc
        target_value = user_context.get(condition['field'])
        
        if not operators[operator](target_value, condition['value']):
            return EvaluationResult(
                eligible=False, 
                reason=condition['error_message']
            )
    return EvaluationResult(eligible=True)
`
      },
      {
        title: 'Multi-Member Appointment Handling',
        description: 'A single appointment can include multiple members (e.g., family booking). Each member is evaluated independently. Partial eligibility supported—some members may proceed while others are blocked. Clear UX feedback showing per-member status.',
      },
      {
        title: 'Cancellation & Rescheduling Logic',
        description: 'Cancellation policies depend on timing (24h notice, same-day, no-show). Refunds are partial or full based on policy. Rescheduling preserves the original payment and applies delta if new slot costs more.',
      },
      {
        title: 'Partial Payment States',
        description: 'Appointments can exist in partially paid states—deposit collected, balance pending. State machine tracks transitions: unpaid → deposited → fully_paid → refund_pending → refunded. Prevents booking confirmation until minimum threshold met.',
      },
      {
        title: 'Admin vs User Flows',
        description: 'Admins can override eligibility rules with audit trail. Users see filtered availability based on their eligibility. Different cancellation policies apply—admins can refund outside policy windows with manager approval.',
      },
    ],

    architectureDescription: `The system consists of:

1. **API Layer**: FastAPI service handling all booking operations with role-based access control.
2. **Rules Engine**: Standalone module evaluating eligibility. Cacheable per (user_id, rule_id) with 5-minute TTL.
3. **Payment Integration**: Abstraction layer supporting multiple payment providers with unified status tracking.
4. **Scheduler**: Background jobs for reminders, no-show detection, and policy enforcement.

The appointment lifecycle is managed as an explicit state machine with defined transitions and guards.`,

    databaseConsiderations: `Core tables: users, memberships, appointments, appointment_members, payments, eligibility_rules, rule_evaluations (cached).

The appointments table has JSONB columns for flexible metadata (special requirements, notes). The appointment_members junction table tracks per-member eligibility results and payment splits.

Eligibility rules stored as JSONB with version tracking. Old evaluations reference the rule version used, enabling auditing even after rule changes.`,

    keyDecisions: [
      {
        context: 'How to represent complex eligibility rules in a maintainable way.',
        options: [
          'Hardcoded Python functions per rule',
          'JSON-based rule schema with interpreter',
          'Full DSL with parser',
        ],
        decision: 'JSON-based rule schema with interpreter',
        reasoning: 'Hardcoded rules require deploys for changes. A full DSL is over-engineering. JSON schemas are editable by non-developers, versionable, and interpretable with reasonable complexity.',
        downside: 'Limited expressiveness compared to code. Complex rules require nesting that can be hard to debug.',
      },
      {
        context: 'Handling appointments with mixed member eligibility.',
        options: [
          'All-or-nothing: entire booking fails if any member is ineligible',
          'Partial booking: eligible members proceed, ineligible get feedback',
        ],
        decision: 'Partial booking with per-member tracking',
        reasoning: 'All-or-nothing creates bad UX for family bookings where one member has a policy issue. Partial booking is more complex but matches user expectations.',
        downside: 'More complex state to track. Edge cases around payment splitting when member count changes.',
      },
      {
        context: 'State management for appointment lifecycle.',
        options: [
          'Boolean flags (is_confirmed, is_cancelled, etc.)',
          'Explicit state machine with enum',
        ],
        decision: 'Explicit state machine with enum and transition guards',
        reasoning: 'Boolean flags create invalid state combinations (confirmed AND cancelled). State machine enforces valid transitions and makes the lifecycle explicit.',
        downside: 'More ceremony per state change. Need to handle "stuck" states with admin escape hatches.',
      },
    ],

    failures: [
      {
        title: 'Race Condition on Popular Slot Booking',
        whatBroke: 'Two users simultaneously booked the same appointment slot, resulting in overbooking.',
        whyBroke: 'The availability check and booking creation were not atomic. Between checking availability and inserting the booking, another transaction completed.',
        impact: 'Double-booked slots on 3 occasions before detection. Had to manually contact and reschedule affected users.',
        fix: 'Added SELECT FOR UPDATE on the slot during availability check, creating a row-level lock. Wrapped the entire check-and-book flow in a single transaction.',
        learned: 'Availability checks without locks are inherently racy. Even low-probability races happen at scale. Pessimistic locking is worth the overhead for critical resources.',
      },
    ],

    tradeoffs: [
      'Eligibility caching trades accuracy for performance. A rule change takes up to 5 minutes to propagate. Acceptable for most policies.',
      'Multi-member payments are split equally by default. Custom splits require admin intervention.',
      'No recurring appointment support. Would add significant complexity to the state machine and conflict detection.',
    ],

    futureImprovements: [
      'Add waitlist functionality with automatic promotion when slots open.',
      'Implement recurring appointment support with conflict handling.',
      'Add analytics dashboard for no-show rates and booking patterns.',
      'Support partial attendance tracking for multi-member appointments.',
    ],

    rebuildingToday: `If rebuilding today, I would:

1. **Simplify the eligibility rule schema**. The JSON structure became too deeply nested. A flatter, more opinionated format would be more maintainable.
2. **Use event sourcing for the appointment lifecycle**. The current state machine works but loses history. Events would enable better auditing and replay.
3. **Build admin tools earlier**. Too much early work was done via database queries. Admin UI should have been prioritized.
4. **Separate payment service entirely**. Payment logic interleaved with booking logic created coupling that complicated both.`,
  },

  {
    id: 4,
    slug: 'payment-engine',
    title: 'Payment & Transaction Engine',
    tagline: 'Idempotent APIs, partial failure handling, and reconciliation for financial transactions.',
    summary: 'A transaction processing system built for reliability: idempotent operations, graceful partial failure handling, and systematic reconciliation with external payment providers.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Stripe API'],

    problemStatement: `Payment systems fail in ways that other systems do not. A network timeout does not mean the payment failed—it might have succeeded. A refund might be processed by Stripe but your webhook might not arrive. Partial refunds on multi-item orders create complex state. Chargebacks require reversing transactions days later.

This project was built to handle the unhappy paths that define payment reliability.`,

    technicalHighlights: [
      {
        title: 'Idempotent Payment API',
        description: 'Every payment request requires a client-generated idempotency key (UUID). The server stores (idempotency_key, result) for 24 hours. Retries return the cached result. This handles network timeouts gracefully—clients can safely retry without double-charging.',
        code: `
# Idempotency middleware-style handler
async def process_payment(idempotency_key: str, payment_data: dict):
    # Atomic check-and-set in Redis
    cached_response = await redis.get(f"idemp:{idempotency_key}")
    if cached_response:
        return json.loads(cached_response)
        
    async with db.transaction():
        # Process actual payment
        result = await stripe_gateway.charge(payment_data)
        
        # Store result with 24h TTL
        await redis.set(
            f"idemp:{idempotency_key}", 
            json.dumps(result), 
            ex=86400
        )
    return result
`
      },
      {
        title: 'Partial Failure Handling',
        description: 'Multi-item orders can have mixed outcomes: some items charged, others failed. Each line item has independent status. The system supports partial fulfillment rather than all-or-nothing, with clear visibility into what succeeded and what did not.',
      },
      {
        title: 'Refund State Machine',
        description: 'Refunds have their own lifecycle: requested → pending_approval → processing → completed/failed. Partial refunds track the remaining refundable amount. Refunds against refunds (re-charges) are blocked in state machine.',
      },
      {
        title: 'Reconciliation System',
        description: 'Nightly job compares internal transaction records against Stripe reports. Discrepancies flagged for manual review: payments Stripe has that we do not, payments we have that Stripe does not. Handles timezone edge cases.',
      },
      {
        title: 'Webhook Reliability',
        description: 'Stripe webhooks are consumed idempotently using event IDs. Duplicate events are dropped. Failed webhook processing triggers exponential backoff retry. Events processed out of order are handled via state machine guards.',
      },
    ],

    architectureDescription: `The payment engine is a critical path service with high reliability requirements:

1. **Payment API**: Synchronous endpoints for payment initiation, returning pessimistic status (pending until webhook confirms).
2. **Webhook Consumer**: Async processing of Stripe events, updating internal state.
3. **Reconciliation Worker**: Nightly Celery job comparing records, generating discrepancy reports.
4. **Audit Logger**: Every state transition logged immutably for compliance and debugging.

All payment operations are wrapped in database transactions with explicit savepoints for partial rollback.`,

    databaseConsiderations: `Core tables: orders, order_items, payments, payment_attempts, refunds, webhook_events, reconciliation_reports.

The payments table stores both internal state and external provider state. The payment_attempts table logs every API call to Stripe for debugging. Webhook events are stored verbatim before processing.

All financial tables have triggers preventing UPDATE/DELETE—only INSERTs allowed. Corrections are made via compensating transactions, preserving full history.`,

    keyDecisions: [
      {
        context: 'How to handle the ambiguity of payment status after a network timeout.',
        options: [
          'Assume failure and let user retry (risk of double charge)',
          'Assume success and risk under-charging',
          'Idempotency keys with cached results',
        ],
        decision: 'Idempotency keys with cached results',
        reasoning: 'Stripe supports idempotency keys natively. By storing our own cache of (key, result), we ensure retries are safe. The client generates the key, enabling retry across sessions.',
        downside: 'Cache storage overhead. Need to handle cache expiry edge cases. Clients must implement key generation correctly.',
      },
      {
        context: 'Whether payments return success immediately or wait for webhook confirmation.',
        options: [
          'Optimistic: return success after Stripe API returns 200',
          'Pessimistic: return pending, update to success via webhook',
        ],
        decision: 'Pessimistic approach',
        reasoning: 'Stripe API success does not guarantee settlement. Card verification can fail asynchronously. Webhooks are the source of truth. Better to under-promise and update than to over-promise and retract.',
        downside: 'Worse UX—user sees "pending" instead of immediate confirmation. Requires frontend to handle pending state.',
      },
      {
        context: 'Handling Stripe webhooks that arrive out of order.',
        options: [
          'Process in arrival order, assume Stripe sends correctly',
          'State machine with guards, reject invalid transitions',
        ],
        decision: 'State machine with guards',
        reasoning: 'Stripe does not guarantee ordering. A refund.succeeded can arrive before payment.succeeded in edge cases. State machine rejects impossible transitions, queueing events for retry.',
        downside: 'Events can get "stuck" waiting for prerequisites. Requires monitoring and manual intervention for edge cases.',
      },
    ],

    failures: [
      {
        title: 'Duplicate Charges Due to Retry Bug',
        whatBroke: 'A small number of users were charged twice for the same order.',
        whyBroke: 'The frontend was generating a new idempotency key on each retry instead of reusing the original. Combined with a network timeout, this resulted in two separate charges.',
        impact: 'Approximately 12 duplicate charges before detection. All refunded within 24 hours. Damaged user trust.',
        fix: 'Fixed the frontend to persist and reuse idempotency keys for payment operations. Added server-side heuristics to flag potential duplicates (same user, same amount, within 5 minutes) for review before processing.',
        learned: 'Idempotency only works if implemented correctly end-to-end. Cannot trust clients to implement correctly—need server-side safeguards. Payment bugs destroy trust faster than anything else.',
      },
    ],

    tradeoffs: [
      'Pessimistic status adds latency but prevents over-promising. Average 2-3 second delay for webhook arrival.',
      'Storing all webhook events verbatim uses significant storage but invaluable for debugging disputes.',
      'Reconciliation is nightly, not real-time. Discrepancies can age up to 24 hours before detection.',
    ],

    futureImprovements: [
      'Support multiple payment providers with unified abstraction layer.',
      'Implement real-time reconciliation for high-value transactions.',
      'Add automatic retry for failed refunds with escalation to human review.',
      'Build comprehensive dispute management workflow.',
    ],

    rebuildingToday: `If rebuilding today, I would:

1. **Invest more in observability upfront**. Payment issues need millisecond-level tracing. Good logging is not enough.
2. **Use a proper saga/workflow engine** (like Temporal) for complex flows instead of hand-rolled state machines. The code would be more maintainable.
3. **Build the duplicate detection heuristics from the start**. The server should never trust clients to implement idempotency correctly.
4. **Design for chargebacks earlier**. They were added late and the integration is messy. They should be a first-class state in the lifecycle.`,
  },
];

export const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug);
};
