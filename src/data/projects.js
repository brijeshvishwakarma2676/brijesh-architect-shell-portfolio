export const projects = [
  //   {
  //     id: 1,
  //     slug: 'realtime-messaging',
  //     title: 'Real-time Messaging & Notification Platform',
  //     tagline: 'Distributed messaging system with delivery guarantees, ordering, and multi-channel notifications.',
  //     summary: 'A backend-first messaging platform built to handle high-throughput real-time communication with reliability guarantees typically expected in production chat systems.',
  //     stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSocket', 'RabbitMQ', 'React'],

  //     problemStatement: `Most messaging implementations focus on the happy path—two users exchanging messages in real-time. The hard problems emerge when you consider: What happens when a user is offline? How do you guarantee message ordering across distributed servers? How do you handle network failures mid-delivery? How do you scale read-heavy operations like fetching chat history?

  // This project was built to solve these problems systematically, not to replicate a UI.`,

  //     technicalHighlights: [
  //       {
  //         title: 'Message Delivery Guarantees',
  //         description: 'Implemented at-least-once delivery with client-side deduplication using message UUIDs. The server acknowledges receipt, and clients retry with exponential backoff until acknowledged. This prevents message loss during network failures without requiring exactly-once semantics, which would add significant complexity.',
  //         code: `
  // # Message delivery acknowledgement handler
  // @router.post("/messages/{message_id}/ack")
  // async def acknowledge_message(
  //     message_id: UUID,
  //     user: User = Depends(get_current_user),
  //     db: Session = Depends(get_db)
  // ):
  //     # Idempotent ack logic
  //     stmt = update(MessageReceipt).where(
  //         MessageReceipt.message_id == message_id,
  //         MessageReceipt.user_id == user.id
  //     ).values(status="delivered", delivered_at=func.now())
  //     await db.execute(stmt)
  //     await db.commit()
  // `
  //       },
  //       {
  //         title: 'Message Ordering',
  //         description: 'Used server-assigned monotonic timestamps per conversation, not client timestamps. Messages are ordered by (conversation_id, server_timestamp) tuple. Clients reorder their local buffer on each fetch to handle out-of-order WebSocket delivery.',
  //       },
  //       {
  //         title: 'Online/Offline State Management',
  //         description: 'Presence tracked via Redis with TTL-based expiry. Heartbeats extend the TTL. When a WebSocket disconnects, presence expires naturally after 30 seconds rather than requiring explicit cleanup—handles crash scenarios gracefully.',
  //       },
  //       {
  //         title: 'Read Receipts & Typing Indicators',
  //         description: 'Read receipts are persisted (write-heavy, batched). Typing indicators are ephemeral, broadcast-only via pub/sub—no persistence, no history. This distinction keeps the database lean while providing real-time feedback.',
  //       },
  //       {
  //         title: 'Notification Fallback Chain',
  //         description: 'If user is offline for > 2 minutes, push notification is queued. If push fails, email is sent. If email fails, it is logged for retry. Each channel has independent retry logic and failure tracking.',
  //       },
  //     ],

  //     architectureDescription: `The system follows a layered architecture:

  // 1. **API Layer**: FastAPI handles HTTP requests for auth, chat history, and user management.
  // 2. **WebSocket Gateway**: Dedicated connection manager handling real-time message delivery and presence.
  // 3. **Message Queue**: RabbitMQ decouples message ingestion from delivery, enabling async processing.
  // 4. **Persistence Layer**: PostgreSQL stores messages, conversations, and user data. Redis handles ephemeral state (presence, typing).
  // 5. **Notification Service**: Separate worker process consuming from the queue, handling push/email delivery.`,
  //     databaseConsiderations: `Key tables: users, conversations, conversation_members, messages, read_receipts.

  // The messages table is partitioned by conversation_id for query performance. Indexes on (conversation_id, created_at DESC) enable efficient pagination. Read receipts use a composite primary key (user_id, message_id) to prevent duplicates.

  // Avoided the temptation to denormalize unread counts into the conversations table—calculating on read is fast enough with proper indexes and simpler to maintain.`,

  //     keyDecisions: [
  //       {
  //         context: 'Needed to decide how to handle message delivery confirmation given unreliable networks.',
  //         options: [
  //           'Exactly-once delivery with distributed transactions',
  //           'At-least-once delivery with client-side deduplication',
  //         ],
  //         decision: 'At-least-once delivery with client-side deduplication',
  //         reasoning: 'Exactly-once requires distributed transactions or complex saga patterns, adding latency and failure modes. At-least-once with idempotent clients is simpler, faster, and good enough for messaging where duplicate detection is cheap (UUID check).',
  //         downside: 'Clients need to handle deduplication. Edge case where very old duplicates might slip through if client state is lost.',
  //       },
  //       {
  //         context: 'Message ordering strategy—client timestamps vs server timestamps.',
  //         options: [
  //           'Use client-provided timestamps for ordering',
  //           'Use server-assigned timestamps exclusively',
  //         ],
  //         decision: 'Server-assigned timestamps',
  //         reasoning: 'Client clocks drift, can be manipulated, and create ordering ambiguity across devices. Server timestamps provide a single source of truth, even if they add a few milliseconds of latency.',
  //         downside: 'Messages appear "sent" slightly after the user pressed send. Requires careful UX to handle optimistic updates.',
  //       },
  //       {
  //         context: 'Whether to store typing indicators.',
  //         options: [
  //           'Persist typing state to database',
  //           'Ephemeral broadcast via pub/sub only',
  //         ],
  //         decision: 'Ephemeral broadcast only',
  //         reasoning: 'Typing indicators are inherently transient. Persisting them adds writes with zero value—no one cares who was typing yesterday. Pub/sub with TTL handles it cleanly.',
  //         downside: 'If a user refreshes, they lose the "typing" state of others until the next broadcast. Acceptable tradeoff.',
  //       },
  //     ],

  //     failures: [
  //       {
  //         title: 'WebSocket Connection Storm After Deploy',
  //         whatBroke: 'After a routine deployment, all connected clients attempted to reconnect simultaneously, overwhelming the WebSocket gateway and causing cascading failures.',
  //         whyBroke: 'The deployment strategy killed all existing connections at once. Clients had aggressive reconnection with no jitter.',
  //         impact: 'Approximately 3 minutes of message delivery delays. Some users saw duplicate messages due to retry logic kicking in.',
  //         fix: 'Implemented rolling deployments for the WebSocket service. Added randomized jitter (0-5 seconds) to client reconnection logic. Added connection rate limiting per IP.',
  //         learned: 'Reconnection storms are a real failure mode. Jitter is not optional in distributed systems. Load testing should include reconnection scenarios, not just new connections.',
  //       },
  //     ],

  //     tradeoffs: [
  //       'Chose PostgreSQL over dedicated message stores like Cassandra. Simpler operations, sufficient for expected scale, easier to query for features like search.',
  //       'No end-to-end encryption implemented. Would require significant client-side key management. Out of scope for this iteration.',
  //       'Message history limited to 90 days with archival. Keeps active tables lean, simplifies GDPR compliance.',
  //     ],

  //     futureImprovements: [
  //       'Add message threading/replies with proper parent references.',
  //       'Implement proper rate limiting per conversation to prevent spam.',
  //       'Add support for message reactions with efficient aggregation.',
  //       'Consider read-replica routing for chat history fetches.',
  //     ],

  //     rebuildingToday: `If rebuilding today, I would:

  // 1. **Start with fewer features**: Skip typing indicators and read receipts for v1. They add complexity without core value.
  // 2. **Use a managed WebSocket service** (like AWS API Gateway WebSocket) instead of self-managing connection state. The ops overhead of WebSocket servers is underestimated.
  // 3. **Delay notification fallback chain** until there is actual user demand. Building email/push integration upfront was premature.
  // 4. **Design for horizontal scaling earlier** by sharding conversations across Redis clusters from day one, not retrofitting later.`,
  //   },

  //   {
  //     id: 2,
  //     slug: 'eligibility-system',
  //     title: 'Eligibility & Appointment Management System',
  //     tagline: 'Complex rule evaluation, multi-member scheduling, and partial state handling.',
  //     summary: 'An enterprise scheduling system handling nuanced eligibility rules, multi-party appointments, cancellations, and partial payments across organizational hierarchies.',
  //     stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'React'],

  //     problemStatement: `Appointment scheduling in enterprise contexts is not just about finding open slots. You need to evaluate eligibility rules that depend on user attributes, membership status, prior appointments, and organizational policies. Then you handle multi-member bookings where some members are eligible and others are not. Then cancellations with refund logic. Then rescheduling with carryover payments.

  // This system was built to handle real-world scheduling complexity, not the "book a slot" happy path.`,

  //     technicalHighlights: [
  //       {
  //         title: 'Complex Eligibility Rules Engine',
  //         description: 'Rules are defined as JSON schemas specifying conditions (membership tier, age range, prior appointment count, cooldown periods). The engine evaluates rules lazily, short-circuiting on first failure. Results include both pass/fail and detailed failure reasons.',
  //         code: `
  // # Rule evaluation engine snippet
  // def evaluate_rule(user_context: dict, rule_schema: dict) -> EvaluationResult:
  //     for condition in rule_schema['conditions']:
  //         operator = condition['op']  # gte, lte, in, etc
  //         target_value = user_context.get(condition['field'])

  //         if not operators[operator](target_value, condition['value']):
  //             return EvaluationResult(
  //                 eligible=False,
  //                 reason=condition['error_message']
  //             )
  //     return EvaluationResult(eligible=True)
  // `
  //       },
  //       {
  //         title: 'Multi-Member Appointment Handling',
  //         description: 'A single appointment can include multiple members (e.g., family booking). Each member is evaluated independently. Partial eligibility supported—some members may proceed while others are blocked. Clear UX feedback showing per-member status.',
  //       },
  //       {
  //         title: 'Cancellation & Rescheduling Logic',
  //         description: 'Cancellation policies depend on timing (24h notice, same-day, no-show). Refunds are partial or full based on policy. Rescheduling preserves the original payment and applies delta if new slot costs more.',
  //       },
  //       {
  //         title: 'Partial Payment States',
  //         description: 'Appointments can exist in partially paid states—deposit collected, balance pending. State machine tracks transitions: unpaid → deposited → fully_paid → refund_pending → refunded. Prevents booking confirmation until minimum threshold met.',
  //       },
  //       {
  //         title: 'Admin vs User Flows',
  //         description: 'Admins can override eligibility rules with audit trail. Users see filtered availability based on their eligibility. Different cancellation policies apply—admins can refund outside policy windows with manager approval.',
  //       },
  //     ],

  //     architectureDescription: `The system consists of:

  // 1. **API Layer**: FastAPI service handling all booking operations with role-based access control.
  // 2. **Rules Engine**: Standalone module evaluating eligibility. Cacheable per (user_id, rule_id) with 5-minute TTL.
  // 3. **Payment Integration**: Abstraction layer supporting multiple payment providers with unified status tracking.
  // 4. **Scheduler**: Background jobs for reminders, no-show detection, and policy enforcement.

  // The appointment lifecycle is managed as an explicit state machine with defined transitions and guards.`,

  //     databaseConsiderations: `Core tables: users, memberships, appointments, appointment_members, payments, eligibility_rules, rule_evaluations (cached).

  // The appointments table has JSONB columns for flexible metadata (special requirements, notes). The appointment_members junction table tracks per-member eligibility results and payment splits.

  // Eligibility rules stored as JSONB with version tracking. Old evaluations reference the rule version used, enabling auditing even after rule changes.`,

  //     keyDecisions: [
  //       {
  //         context: 'How to represent complex eligibility rules in a maintainable way.',
  //         options: [
  //           'Hardcoded Python functions per rule',
  //           'JSON-based rule schema with interpreter',
  //           'Full DSL with parser',
  //         ],
  //         decision: 'JSON-based rule schema with interpreter',
  //         reasoning: 'Hardcoded rules require deploys for changes. A full DSL is over-engineering. JSON schemas are editable by non-developers, versionable, and interpretable with reasonable complexity.',
  //         downside: 'Limited expressiveness compared to code. Complex rules require nesting that can be hard to debug.',
  //       },
  //       {
  //         context: 'Handling appointments with mixed member eligibility.',
  //         options: [
  //           'All-or-nothing: entire booking fails if any member is ineligible',
  //           'Partial booking: eligible members proceed, ineligible get feedback',
  //         ],
  //         decision: 'Partial booking with per-member tracking',
  //         reasoning: 'All-or-nothing creates bad UX for family bookings where one member has a policy issue. Partial booking is more complex but matches user expectations.',
  //         downside: 'More complex state to track. Edge cases around payment splitting when member count changes.',
  //       },
  //       {
  //         context: 'State management for appointment lifecycle.',
  //         options: [
  //           'Boolean flags (is_confirmed, is_cancelled, etc.)',
  //           'Explicit state machine with enum',
  //         ],
  //         decision: 'Explicit state machine with enum and transition guards',
  //         reasoning: 'Boolean flags create invalid state combinations (confirmed AND cancelled). State machine enforces valid transitions and makes the lifecycle explicit.',
  //         downside: 'More ceremony per state change. Need to handle "stuck" states with admin escape hatches.',
  //       },
  //     ],

  //     failures: [
  //       {
  //         title: 'Race Condition on Popular Slot Booking',
  //         whatBroke: 'Two users simultaneously booked the same appointment slot, resulting in overbooking.',
  //         whyBroke: 'The availability check and booking creation were not atomic. Between checking availability and inserting the booking, another transaction completed.',
  //         impact: 'Double-booked slots on 3 occasions before detection. Had to manually contact and reschedule affected users.',
  //         fix: 'Added SELECT FOR UPDATE on the slot during availability check, creating a row-level lock. Wrapped the entire check-and-book flow in a single transaction.',
  //         learned: 'Availability checks without locks are inherently racy. Even low-probability races happen at scale. Pessimistic locking is worth the overhead for critical resources.',
  //       },
  //     ],

  //     tradeoffs: [
  //       'Eligibility caching trades accuracy for performance. A rule change takes up to 5 minutes to propagate. Acceptable for most policies.',
  //       'Multi-member payments are split equally by default. Custom splits require admin intervention.',
  //       'No recurring appointment support. Would add significant complexity to the state machine and conflict detection.',
  //     ],

  //     futureImprovements: [
  //       'Add waitlist functionality with automatic promotion when slots open.',
  //       'Implement recurring appointment support with conflict handling.',
  //       'Add analytics dashboard for no-show rates and booking patterns.',
  //       'Support partial attendance tracking for multi-member appointments.',
  //     ],

  //     rebuildingToday: `If rebuilding today, I would:

  // 1. **Simplify the eligibility rule schema**. The JSON structure became too deeply nested. A flatter, more opinionated format would be more maintainable.
  // 2. **Use event sourcing for the appointment lifecycle**. The current state machine works but loses history. Events would enable better auditing and replay.
  // 3. **Build admin tools earlier**. Too much early work was done via database queries. Admin UI should have been prioritized.
  // 4. **Separate payment service entirely**. Payment logic interleaved with booking logic created coupling that complicated both.`,
  //   },

  //   {
  //     id: 3,
  //     slug: 'payment-engine',
  //     title: 'Payment & Transaction Engine',
  //     tagline: 'Idempotent APIs, partial failure handling, and reconciliation for financial transactions.',
  //     summary: 'A transaction processing system built for reliability: idempotent operations, graceful partial failure handling, and systematic reconciliation with external payment providers.',
  //     stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Stripe API'],

  //     problemStatement: `Payment systems fail in ways that other systems do not. A network timeout does not mean the payment failed—it might have succeeded. A refund might be processed by Stripe but your webhook might not arrive. Partial refunds on multi-item orders create complex state. Chargebacks require reversing transactions days later.

  // This project was built to handle the unhappy paths that define payment reliability.`,

  //     technicalHighlights: [
  //       {
  //         title: 'Idempotent Payment API',
  //         description: 'Every payment request requires a client-generated idempotency key (UUID). The server stores (idempotency_key, result) for 24 hours. Retries return the cached result. This handles network timeouts gracefully—clients can safely retry without double-charging.',
  //         code: `
  // # Idempotency middleware-style handler
  // async def process_payment(idempotency_key: str, payment_data: dict):
  //     # Atomic check-and-set in Redis
  //     cached_response = await redis.get(f"idemp:{idempotency_key}")
  //     if cached_response:
  //         return json.loads(cached_response)

  //     async with db.transaction():
  //         # Process actual payment
  //         result = await stripe_gateway.charge(payment_data)

  //         # Store result with 24h TTL
  //         await redis.set(
  //             f"idemp:{idempotency_key}",
  //             json.dumps(result),
  //             ex=86400
  //         )
  //     return result
  // `
  //       },
  //       {
  //         title: 'Partial Failure Handling',
  //         description: 'Multi-item orders can have mixed outcomes: some items charged, others failed. Each line item has independent status. The system supports partial fulfillment rather than all-or-nothing, with clear visibility into what succeeded and what did not.',
  //       },
  //       {
  //         title: 'Refund State Machine',
  //         description: 'Refunds have their own lifecycle: requested → pending_approval → processing → completed/failed. Partial refunds track the remaining refundable amount. Refunds against refunds (re-charges) are blocked in state machine.',
  //       },
  //       {
  //         title: 'Reconciliation System',
  //         description: 'Nightly job compares internal transaction records against Stripe reports. Discrepancies flagged for manual review: payments Stripe has that we do not, payments we have that Stripe does not. Handles timezone edge cases.',
  //       },
  //       {
  //         title: 'Webhook Reliability',
  //         description: 'Stripe webhooks are consumed idempotently using event IDs. Duplicate events are dropped. Failed webhook processing triggers exponential backoff retry. Events processed out of order are handled via state machine guards.',
  //       },
  //     ],

  //     architectureDescription: `The payment engine is a critical path service with high reliability requirements:

  // 1. **Payment API**: Synchronous endpoints for payment initiation, returning pessimistic status (pending until webhook confirms).
  // 2. **Webhook Consumer**: Async processing of Stripe events, updating internal state.
  // 3. **Reconciliation Worker**: Nightly Celery job comparing records, generating discrepancy reports.
  // 4. **Audit Logger**: Every state transition logged immutably for compliance and debugging.

  // All payment operations are wrapped in database transactions with explicit savepoints for partial rollback.`,

  //     databaseConsiderations: `Core tables: orders, order_items, payments, payment_attempts, refunds, webhook_events, reconciliation_reports.

  // The payments table stores both internal state and external provider state. The payment_attempts table logs every API call to Stripe for debugging. Webhook events are stored verbatim before processing.

  // All financial tables have triggers preventing UPDATE/DELETE—only INSERTs allowed. Corrections are made via compensating transactions, preserving full history.`,

  //     keyDecisions: [
  //       {
  //         context: 'How to handle the ambiguity of payment status after a network timeout.',
  //         options: [
  //           'Assume failure and let user retry (risk of double charge)',
  //           'Assume success and risk under-charging',
  //           'Idempotency keys with cached results',
  //         ],
  //         decision: 'Idempotency keys with cached results',
  //         reasoning: 'Stripe supports idempotency keys natively. By storing our own cache of (key, result), we ensure retries are safe. The client generates the key, enabling retry across sessions.',
  //         downside: 'Cache storage overhead. Need to handle cache expiry edge cases. Clients must implement key generation correctly.',
  //       },
  //       {
  //         context: 'Whether payments return success immediately or wait for webhook confirmation.',
  //         options: [
  //           'Optimistic: return success after Stripe API returns 200',
  //           'Pessimistic: return pending, update to success via webhook',
  //         ],
  //         decision: 'Pessimistic approach',
  //         reasoning: 'Stripe API success does not guarantee settlement. Card verification can fail asynchronously. Webhooks are the source of truth. Better to under-promise and update than to over-promise and retract.',
  //         downside: 'Worse UX—user sees "pending" instead of immediate confirmation. Requires frontend to handle pending state.',
  //       },
  //       {
  //         context: 'Handling Stripe webhooks that arrive out of order.',
  //         options: [
  //           'Process in arrival order, assume Stripe sends correctly',
  //           'State machine with guards, reject invalid transitions',
  //         ],
  //         decision: 'State machine with guards',
  //         reasoning: 'Stripe does not guarantee ordering. A refund.succeeded can arrive before payment.succeeded in edge cases. State machine rejects impossible transitions, queueing events for retry.',
  //         downside: 'Events can get "stuck" waiting for prerequisites. Requires monitoring and manual intervention for edge cases.',
  //       },
  //     ],

  //     failures: [
  //       {
  //         title: 'Duplicate Charges Due to Retry Bug',
  //         whatBroke: 'A small number of users were charged twice for the same order.',
  //         whyBroke: 'The frontend was generating a new idempotency key on each retry instead of reusing the original. Combined with a network timeout, this resulted in two separate charges.',
  //         impact: 'Approximately 12 duplicate charges before detection. All refunded within 24 hours. Damaged user trust.',
  //         fix: 'Fixed the frontend to persist and reuse idempotency keys for payment operations. Added server-side heuristics to flag potential duplicates (same user, same amount, within 5 minutes) for review before processing.',
  //         learned: 'Idempotency only works if implemented correctly end-to-end. Cannot trust clients to implement correctly—need server-side safeguards. Payment bugs destroy trust faster than anything else.',
  //       },
  //     ],

  //     tradeoffs: [
  //       'Pessimistic status adds latency but prevents over-promising. Average 2-3 second delay for webhook arrival.',
  //       'Storing all webhook events verbatim uses significant storage but invaluable for debugging disputes.',
  //       'Reconciliation is nightly, not real-time. Discrepancies can age up to 24 hours before detection.',
  //     ],

  //     futureImprovements: [
  //       'Support multiple payment providers with unified abstraction layer.',
  //       'Implement real-time reconciliation for high-value transactions.',
  //       'Add automatic retry for failed refunds with escalation to human review.',
  //       'Build comprehensive dispute management workflow.',
  //     ],

  //     rebuildingToday: `If rebuilding today, I would:

  // 1. **Invest more in observability upfront**. Payment issues need millisecond-level tracing. Good logging is not enough.
  // 2. **Use a proper saga/workflow engine** (like Temporal) for complex flows instead of hand-rolled state machines. The code would be more maintainable.
  // 3. **Build the duplicate detection heuristics from the start**. The server should never trust clients to implement idempotency correctly.
  // 4. **Design for chargebacks earlier**. They were added late and the integration is messy. They should be a first-class state in the lifecycle.`,
  //   },

  {
    id: 4,
    slug: "blinkbasket-backend",
    title: "BlinkBasket: E-commerce Core Infrastructure",
    tagline:
      "High-availability retail backend with secure session orchestration and media-rich product catalogs.",
    summary:
      "A robust Node.js/Express ecosystem developed as a final year college project to handle the complexities of modern e-commerce: multi-tier category management, secure JWT-based identity, and automated media pipelines.",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Cloudinary", "Vercel"],

    problemStatement: `Building an e-commerce backend requires more than CRUD operations. The real challenges are: How do you handle deep nested category trees for infinite breadcrumbs? How do you ensure user sessions are secure yet frictionless? How do you manage thousands of product images without manual processing?

This project was my final year college technical core, focusing on building a production-grade infrastructure from scratch with a focus on data integrity and security-first development.`,

    technicalHighlights: [
      {
        title: "Dual-Token JWT Security",
        description:
          "Implemented a high-security authentication flow using short-lived Access Tokens and long-lived Refresh Tokens. Refresh tokens are rotating and stored in secure, HttpOnly cookies to mitigate XSS and CSRF risks while maintaining a seamless user experience.",
        code: `
// JWT Token Generation Strategy
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};
`,
      },
      {
        title: "Recursive Category Orchestration",
        description:
          'Developed a recursive category model allowing for infinite sub-category depth. Used Mongoose hooks to auto-update path indices, enabling rapid breadcrumb generation and "Parent Filter" queries without expensive recursive DB lookups.',
      },
      {
        title: "Media Pipeline Automation",
        description:
          "Integrated Cloudinary with a custom middleware to handle automatic image optimization and versioning. Uploads are strictly validated on the server side (file type, size) before streaming to the cloud provider to minimize storage costs.",
      },
      {
        title: "Security-Hardened Middleware",
        description:
          "Standardized security posture using Helmet.js and custom CORS policies. All inputs are sanitized before database entry to prevent NoSQL injection, and detailed error mapping ensures no technical metadata is leaked to the client.",
      },
    ],

    architectureDescription: `The system follows a classic Layered Architectural Pattern:

1. **Routing Layer**: Express routers segmenting users, products, categories, and orders.
2. **Controller Layer**: Decoupled business logic handling authentication flows and catalog orchestration.
3. **Data Access Layer**: Mongoose schemas with strictly typed field validation and custom aggregate pipelines for search.
4. **Integration Layer**: External services for media (Cloudinary) and transactional email (Nodemailer).

Deployed on Vercel as a Serverless function environment, utilizing global edge networking for low-latency API responses.`,

    databaseConsiderations: `Designed a relational-document hybrid schema in MongoDB to balance query performance with data consistency. 

Key Collections & Logic:
- **Users & Addresses**: Implemented multi-address support using sub-document arrays for atomicity.
- **Product Catalog**: Utilized ObjectId references for Categories while denormalizing "Primary Category Name" to avoid expensive joins on the home page.
- **Orders**: Used a snapshot pattern—copying product data (price, title) into the Order document at checkout to ensure historical accuracy despite future product updates.

Performance & Optimization:
- **Compound Indexing**: Optimized (category_id, status) for fast catalog filtering.
- **Text Search**: Configured Text Indices on Product name/description for native MongoDB search functionality.
- **Query Efficiency**: Leveraged .lean() for read-only operations to reduce Mongoose overhead and memory footprint.`,

    keyDecisions: [
      {
        context:
          "Choosing between traditional session cookies vs JWT for a distributed backend.",
        options: [
          "In-memory server sessions",
          "JWT with local storage",
          "Rotating JWT in Secure Cookies",
        ],
        decision: "Rotating JWT in Secure HttpOnly Cookies",
        reasoning:
          "In-memory sessions don't scale across multiple server instances. Local storage is vulnerable to XSS. Secure cookies with JWT rotation provide the best balance of stateless scalability and enterprise-grade security for a modern web application.",
        downside:
          "Slightly higher complexity in handling token refresh logic on the frontend.",
      },
      {
        context: "How to handle product image storage and delivery.",
        options: [
          "Local server storage (FS)",
          "S3 Static Bucket",
          "Cloudinary Media API",
        ],
        decision: "Cloudinary Media API",
        reasoning:
          "Local FS doesn't scale. S3 requires a separate CDN and resizing logic. Cloudinary provides on-the-fly transformations and global CDN delivery out of the box, significantly reducing development architecture complexity.",
        downside:
          "Vendor lock-in and potentially higher usage cost at extreme scale.",
      },
    ],

    failures: [
      {
        title: "MongoDB Connection Management",
        whatBroke:
          "Performance degraded significantly during testing as the server reached the maximum connection limit of the MongoDB cluster.",
        whyBroke:
          "Middleware was initializing new Mongoose connections per request in an early draft, rather than utilizing a singleton connection pool.",
        impact:
          "API response times spiked to 5+ seconds and eventually resulted in 503 errors.",
        fix: "Refactored the database connection into a dedicated singleton module that initializes once on startup and is shared across the application.",
        learned:
          "Connection lifecycle management is as important as the queries themselves. Always use singleton patterns for database adapters to prevent resource exhaustion.",
      },
    ],

    tradeoffs: [
      "Used MongoDB native search instead of Elasticsearch. Sufficient for the project scope, but would need migration for larger datasets.",
      "JSON-only API responses. No support for GraphQL, keeping the client implementation simple and predictable.",
      "Manual category ordering. Simpler to implement than a drag-and-drop sortable tree system.",
    ],

    futureImprovements: [
      "Implement full-text search with Elasticsearch for better relevancy.",
      "Add support for multi-currency and internationalized product descriptions.",
      "Introduce a dedicated caching layer (Redis) for product catalog data.",
    ],

    rebuildingToday: `If rebuilding today, I would:

1. **Start with a more formal API documentation tool** (like Swagger/OpenAPI) from day one. Retrofitting docs is time-consuming.
2. **Adopt a more modular folder structure** (Domain-Driven Design) to separate e-commerce logic (orders, basket) from core infrastructure (users, auth).
3. **Use TypeScript exclusively** to prevent the common runtime errors associated with dynamic product schemas.
4. **Implement automated integration tests for the JWT flow** to catch edge cases in token rotation earlier.`,
  },
  {
    id: 5,
    slug: "talktogether-chat",
    title: "TalkTogether: Real-time Communication Engine",
    tagline:
      "Full-duplex messaging platform with WebRTC signaling and Redis-backed presence tracking.",
    summary:
      "A high-concurrency chat ecosystem built with FastAPI and Socket.io, featuring low-latency signaling for voice/video calls and optimistic UI for a seamless messaging experience.",
    stack: ["FastAPI", "Socket.io", "Redis", "MongoDB", "React", "WebRTC"],

    problemStatement: `Real-time synchronization is one of the hardest problems in distributed systems. For TalkTogether, the challenge was three-fold: 
1. **Low-Latency Signaling**: How to coordinate WebRTC handshakes (offers, answers, ICE candidates) without significant overhead.
2. **Reliable Presence**: Tracking online/offline status reliably across multiple server instances using Redis.
3. **0-Latency Feel**: Implementing a robust Optimistic UI that handles pending states, ACKs, and delivery confirmations seamlessly.`,

    technicalHighlights: [
      {
        title: "Full-Duplex Signaling Engine",
        description:
          "Architected a custom signaling layer using Socket.io and FastAPI ASGI integration. The engine coordinates complex WebRTC handshakes between peers, enabling browser-native voice and video streams with sub-100ms signaling latency.",
        code: `
@sio.event
async def call_initiate(sid, data):
    # Step 1: Caller initiates signaling
    receiver_sid = socket_manager.get_socket_id(data['to_user_id'])
    if receiver_sid:
        await sio.emit('incoming_call', {
            'from_user_id': session.get('user_id'),
            'call_type': data.get('call_type', 'video')
        }, to=receiver_sid)
`,
      },
      {
        title: "Presence Orchestration with Redis",
        description:
          "Utilized Redis as a high-speed pub/sub and session store to track user presence globally. This ensured that online/offline indicators remained consistent across the entire cluster, regardless of which server node the client was connected to.",
      },
      {
        title: "Optimistic UI with Nonce Matching",
        description:
          "Implemented a client-side messaging flow using nonces to track pending messages. This allows users to see their messages instantly while wait-free reconciliation happens in the background via socket ACKs.",
      },
      {
        title: "Secure Obfuscation Layer",
        description:
          "Developed a Unicode-safe Base64 obfuscation layer for message content, laying the groundwork for transition to full E2EE (RSA/AES) by separating transport logic from content processing.",
      },
    ],

    architectureDescription: `The architecture prioritizes real-time throughput:

1. **API Layer**: FastAPI handling stateless REST requests (Auth, Profile).
2. **Signaling Layer**: Socket.io managing persistent connections and peer-to-peer data relay.
3. **State Layer**: Redis handling ephemeral data (Online status, Active typing indicators).
4. **Persistence Layer**: MongoDB (Beanie ODM) for historical message storage and conversation indexing.`,
    architectureDiagrams: [
      {
        type: "architecture",
        label: "System Topology",
        description:
          "High-level overview of the signaling server, presence store, and P2P media plane.",
      },
      {
        type: "signaling",
        label: "Call Signaling Handshake",
        description:
          "The step-by-step process of exchanging SDP offers and ICE candidates through the FastAPI signal server.",
      },
      {
        type: "webrtc-p2p",
        label: "Media Stream Path",
        description:
          "Details the direct peer-to-peer connection for voice/video streams, including STUN/TURN fallbacks.",
      },
    ],

    databaseConsiderations: `Leveraged MongoDB for its flexible document structure to handle varying message types (text, call logs, system notifications).

Key features:
- **Conversation Snapshots**: Storing the last message directly in the conversation document to avoid O(N) aggregate lookups for the chat list.
- **Partial Indexing**: Created indices on active user sessions to speed up presence queries.
- **TTL Collections**: Used for temporary signaling data and ephemeral logs to prevent database bloat.`,

    keyDecisions: [
      {
        context: "How to handle user presence in a distributed environment.",
        options: [
          "Database polling (SQL/NoSQL)",
          "Local in-memory maps",
          "Redis Hub-and-Spoke Status",
        ],
        decision: "Redis Hub-and-Spoke Status",
        reasoning:
          "Polling is too slow for 1:1 chat. In-memory maps fail in horizontal scaling. Redis provides the atomicity and speed needed for real-time presence across multiple backend workers.",
        downside: "Adds a critical infrastructure dependency on Redis.",
      },
      {
        context: "Signaling protocol for voice/video.",
        options: [
          "Custom WebSocket protocol",
          "Socket.io standard events",
          "Long polling",
        ],
        decision: "Socket.io standard events",
        reasoning:
          "Socket.io handles reconnections, heartbeat, and buffering out of the box, allowing me to focus on the WebRTC state machine logic rather than the transport quirks.",
        downside: "Slightly higher overhead compared to raw WebSockets.",
      },
    ],

    failures: [
      {
        title: 'The "Ghost Presence" Problem',
        whatBroke:
          'Users would frequently appear "Online" even after closing their browser or losing connection.',
        whyBroke:
          'The server was relying solely on the explicit "disconnect" event, which isn\'t fired during abrupt network failures (ISP drops, battery death).',
        impact: 'Confusion in the UI and failed call attempts to "Zombies".',
        fix: 'Implemented a Redis-based heartbeat system and a "Liveness Check" using Socket.io pings. If no heartbeat is received within 60s, the system automatically broadcasts an offline status.',
        learned:
          "In distributed systems, silence must be treated as a fault. Always implement active heartbeats for presence tracking.",
      },
    ],

    tradeoffs: [
      "Used Base64 obfuscation instead of native WebCrypto RSA. Prioritized UX and signaling reliability for the MVP over complex client-side key management.",
      "Manual WebRTC signaling instead of a third-party SDK (like Agora). Greater control and 0 cost, but significantly higher implementation complexity.",
      "Limited group chat size (10 members). Optimized for 1:1 performance rather than massive group concurrency.",
    ],

    futureImprovements: [
      "Transition to native WebCrypto (AES-GCM) for true end-to-end encryption.",
      "Implement a media server (SFU) like Mediasoup to support group video calls with 10+ participants.",
      "Add push notifications via Firebase for offline delivery alerts.",
    ],

    rebuildingToday: `If rebuilding today, I would:

1. **Use TypeScript for both Backend (pydantic/typing) and Frontend** to enforce rigorous data contracts for the complex signaling events.
2. **Abstract the signaling layer** into a dedicated service to allow for easier migration to different transport protocols (e.g., WebTransport).
3. **Use a specialized WebRTC library** (like simple-peer) to handle cross-browser SDP normalization, which was a recurring pain point.
4. **Implement automated integration tests** to simulate varying network conditions (latency, jitter) for the signaling flow.`,
  },
  {
    id: 6,
    slug: "nexa-social",
    title: "Content-Driven Social Platform",
    tagline:
      "High-precision social ecosystem with 1080p story rendering and immersive glassmorphism UI.",
    summary:
      "A sophisticated social networking platform focusing on ephemeral content (Stories) and high-fidelity media presentation. Engineered with a custom 1080p Canvas editor and a real-time feed optimized for visual impact.",
    stack: [
      "FastAPI",
      "SQLAlchemy",
      "Redis",
      "React",
      "TailwindCSS",
      "Cloudinary",
    ],

    problemStatement: `Building a modern social feed requires balancing high-resolution media with snappy performance. The core challenges were:
1. **The 1080p Story Problem**: Ensuring story creators produce consistent 1080x1920 outputs across devices with varying pixel densities.
2. **Real-time Synchronized Playback**: Coordinating high-precision timers for auto-advancing stories without frame drops or state mismatches.
3. **Visual Aesthetics vs Performance**: Implementing heavy backdrop-blur filters (Glassmorphism) without degrading mobile scroll performance.`,

    technicalHighlights: [
      {
        title: "High-Resolution Canvas Engine",
        description:
          "Developed a custom story editor using a virtual 1080x1920 logical canvas. This ensures that every story exported is production-ready for mobile viewports, regardless of the user's actual screen resolution during the editing phase.",
        code: `
// Scale-to-fit with logical coordinate stabilization
const canvasScale = Math.min(containerWidth / 1080, containerHeight / 1920);
ctx.setTransform(canvasScale, 0, 0, canvasScale, 0, 0);
`,
      },
      {
        title: "Precise Playback Synchronization",
        description:
          'Replaced standard setInterval with a requestAnimationFrame-based timing loop for story playback. This solved the "stale closure" drift problem and provided perfectly smooth progress bar animations.',
      },
      {
        title: "Optimized Media Pipeline",
        description:
          "Engineered a smart upload pipeline that auto-calculates optimal JPEG quality/resolution ratios to minimize payload size while retaining the neon-heavy aesthetic of the platform.",
      },
      {
        title: "Shared Component Architecture",
        description:
          'Built a shared "frosted glass" design system that leverages hardware-accelerated CSS filters, maintaining 60fps even with multiple layers of transparency and blur.',
      },
    ],

    architectureDescription: `The system is built for horizontal scale and visual fidelity:

1. **Frontend Layer**: React + TailwindCSS using a custom "Canvas Overlay" pattern for content creation.
2. **Compute Layer**: FastAPI backend with asynchronous workers for image processing and feed generation.
3. **Cache Layer**: Redis handling ephemeral story metadata and session-level rate limiting.
4. **Relational Storage**: SQLAlchemy (PostgreSQL/SQLite) managing complex social graphs and user interactions.`,

    databaseConsiderations: `Focused on efficient social graph traversal and media metadata management.

Key implementations:
- **Asynchronous IO**: Full SQLAlchemy 2.0 async integration to handle high-concurrency feed requests.
- **Story Sharding**: Partioned story metadata by date to ensure the "Next Story" lookups remain O(1) in the viewer.
- **Media Mapping**: Centralized Cloudinary URL generation to allow for dynamic "on-the-fly" image transformations (transforms, crops).`,

    keyDecisions: [
      {
        context: "Choosing the right rendering method for the Story Creator.",
        options: [
          "Direct DOM-to-Image (html2canvas)",
          "Server-side Puppeteer rendering",
          "Manual Canvas API (Virtual Canvas)",
        ],
        decision: "Manual Canvas API",
        reasoning:
          "html2canvas is notoriously prone to font-rendering inconsistencies. Server-side rendering is too slow for real-time previews. The Virtual Canvas API provides total control over every pixel with zero network latency.",
        downside: "High implementation cost for panning/zooming logic.",
      },
      {
        context: "State management for the high-precision Story Viewer.",
        options: [
          "Native React State (useState)",
          "Zustand with External Refs",
          "Redux Toolkit",
        ],
        decision: "Zustand with External Refs",
        reasoning:
          "React state updates are asynchronous and can drift. By combining Zustand for UI state and mutable Refs for the time-sensitive animation loop, I achieved frame-perfect synchronization.",
        downside:
          "Bypasses the traditional React lifecycle for the animation core.",
      },
    ],

    failures: [
      {
        title: 'The "Ghost Story" Progress Bar',
        whatBroke:
          "Stories would frequently get stuck at 100% or skip frames when the browser tab was backgrounded.",
        whyBroke:
          "The initial implementation used a simple incrementing counter inside a useEffect, which was throttled by the browser's background tab power-saving features.",
        impact: "Broken user experience and incorrect story analytics.",
        fix: 'Switched to a timestamp-delta calculation. Instead of "inc counter by 1", the system calculates "currentTime - startTime" on every frame. This ensures the timer remains accurate even if the browser throttles the execution frequency.',
        learned:
          "Never trust incremental counters for time-sensitive UI; always anchor animations to an absolute hardware timestamp.",
      },
    ],

    tradeoffs: [
      "Prioritized visual fidelity over legacy browser support (relies heavily on Backdrop Filter API).",
      "Chose asynchronous SQLite for development speed over full PostgreSQL overhead for initial staging.",
      "Manual JPEG compression (quality 0.85) over PNG transparent layers to reduce bandwidth by ~70%.",
    ],

    futureImprovements: [
      "Implement HLS/DASH video streaming support for video-based stories.",
      'Add AI-driven "Smart Crop" using Cloudinary filters to focus on faces automatically.',
      "Transition to specialized vector rendering (Paper.js) for drawing tools.",
    ],

    rebuildingToday: `If rebuilding today, I would:

1. **Implement a proper "Scene Graph"** for the Story Editor to allow for infinitely undoable actions and better object manipulation.
2. **Add automated visual regression testing** (using Playwright/Percy) to catch CSS filter breaks across different browser engines.
3. **Move to a more robust relational database** early to handle the complex "Mutual Friend" logic via native SQL recursions.
4. **Use Framer Motion** for the non-canvas UI elements to ensure consistent staggering and layout animations.`,
  },
];

export const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug);
};
