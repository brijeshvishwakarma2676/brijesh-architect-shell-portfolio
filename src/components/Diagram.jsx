import React from "react";

/**
 * A minimal, typography-first SVG diagram component.
 * Instead of complex Mermaid, we use simple SVG shapes with high-quality CSS styling.
 */
export default function Diagram({ type, projectSlug }) {
  // BlinkBasket Specific Diagrams
  if (projectSlug === "blinkbasket-backend") {
    if (type === "architecture") {
      return (
        <div className="my-8 overflow-x-auto">
          <div className="min-w-[700px] flex justify-center py-10 bg-light-100 rounded-lg border border-light-200">
            <svg
              width="700"
              height="240"
              viewBox="0 0 700 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* External Services */}
              <rect
                x="520"
                y="20"
                width="140"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="590"
                y="50"
                textAnchor="middle"
                className="text-[11px] font-mono fill-zinc-500"
              >
                Cloudinary (Media)
              </text>

              <rect
                x="520"
                y="90"
                width="140"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="590"
                y="120"
                textAnchor="middle"
                className="text-[11px] font-mono fill-zinc-500"
              >
                Nodemailer (SMTP)
              </text>

              {/* Core System */}
              <rect
                x="40"
                y="90"
                width="120"
                height="60"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="100"
                y="125"
                textAnchor="middle"
                className="text-[12px] font-mono fill-dark-700 uppercase tracking-wider"
              >
                React Client
              </text>

              <rect
                x="240"
                y="90"
                width="160"
                height="60"
                rx="4"
                className="fill-white stroke-accent"
                strokeWidth="2"
              />
              <text
                x="320"
                y="125"
                textAnchor="middle"
                className="text-[12px] font-mono fill-dark-700 font-bold uppercase tracking-wider"
              >
                Express API (Vercel)
              </text>

              <rect
                x="240"
                y="170"
                width="160"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="320"
                y="200"
                textAnchor="middle"
                className="text-[11px] font-mono fill-dark-700"
              >
                MongoDB Atlas
              </text>

              {/* Flow Lines */}
              <line
                x1="160"
                y1="120"
                x2="240"
                y2="120"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="320"
                y1="150"
                x2="320"
                y2="170"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <path
                d="M400 110 H520"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <path
                d="M400 130 H460 V45 H520"
                stroke="#a1a1aa"
                fill="none"
                markerEnd="url(#arrowhead)"
              />

              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#a1a1aa" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      );
    }

    if (type === "database") {
      return (
        <div className="my-8 overflow-x-auto">
          <div className="min-w-[800px] flex justify-center py-10 bg-light-100 rounded-lg border border-light-200">
            <svg
              width="800"
              height="280"
              viewBox="0 0 800 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* User Document */}
              <rect
                x="20"
                y="20"
                width="180"
                height="140"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <rect
                x="20"
                y="20"
                width="180"
                height="30"
                rx="4"
                className="fill-zinc-100"
              />
              <text
                x="110"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                User Collection
              </text>
              <text
                x="35"
                y="65"
                className="text-[10px] font-mono fill-zinc-500"
              >
                _id: ObjectId (PK)
              </text>
              <text
                x="35"
                y="85"
                className="text-[10px] font-mono fill-zinc-500"
              >
                email: String (Unique)
              </text>
              <text
                x="35"
                y="105"
                className="text-[10px] font-mono fill-zinc-500"
              >
                addresses: [AddressSchema]
              </text>
              <text
                x="35"
                y="125"
                className="text-[10px] font-mono fill-zinc-500"
              >
                role: Enum ['ADMIN', 'USER']
              </text>

              {/* Product Document */}
              <rect
                x="310"
                y="20"
                width="180"
                height="140"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <rect
                x="310"
                y="20"
                width="180"
                height="30"
                rx="4"
                className="fill-zinc-100"
              />
              <text
                x="400"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                Product Collection
              </text>
              <text
                x="325"
                y="65"
                className="text-[10px] font-mono fill-zinc-500"
              >
                _id: ObjectId (PK)
              </text>
              <text
                x="325"
                y="85"
                className="text-[10px] font-mono fill-zinc-500"
              >
                category_id: ObjectId (FK)
              </text>
              <text
                x="325"
                y="105"
                className="text-[10px] font-mono fill-zinc-500"
              >
                image: [String] (CDN URLs)
              </text>
              <text
                x="325"
                y="125"
                className="text-[10px] font-mono fill-zinc-500"
              >
                price: Number
              </text>

              {/* Order Document */}
              <rect
                x="600"
                y="20"
                width="180"
                height="180"
                rx="4"
                className="fill-white stroke-accent/20"
                strokeWidth="1"
              />
              <rect
                x="600"
                y="20"
                width="180"
                height="30"
                rx="4"
                className="fill-accent/5"
              />
              <text
                x="690"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-accent"
              >
                Order (Snapshot)
              </text>
              <text
                x="615"
                y="65"
                className="text-[10px] font-mono fill-zinc-500"
              >
                _id: ObjectId (PK)
              </text>
              <text
                x="615"
                y="85"
                className="text-[10px] font-mono fill-zinc-500"
              >
                user_id: ObjectId (FK)
              </text>
              <text
                x="615"
                y="105"
                className="text-[10px] font-mono fill-zinc-500 italic"
              >
                products: [SnapshotSchema]
              </text>
              <text
                x="615"
                y="125"
                className="text-[10px] font-mono fill-zinc-500 text-accent/70"
              >
                totalPrice: Number
              </text>
              <text
                x="615"
                y="145"
                className="text-[10px] font-mono fill-zinc-500"
              >
                paymentId: String
              </text>

              {/* Connections */}
              <path d="M200 80 H310" stroke="#e5e7eb" strokeDasharray="4 2" />
              <path d="M490 80 H600" stroke="#e5e7eb" strokeDasharray="4 2" />
            </svg>
          </div>
        </div>
      );
    }
  }

  // TalkTogether Specific Diagrams
  if (projectSlug === "talktogether-chat") {
    if (type === "architecture") {
      return (
        <div className="my-8 overflow-x-auto">
          <div className="min-w-[700px] flex justify-center py-10 bg-light-100 rounded-lg border border-light-200">
            <svg
              width="700"
              height="240"
              viewBox="0 0 700 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Clients */}
              <rect
                x="40"
                y="40"
                width="100"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="90"
                y="70"
                textAnchor="middle"
                className="text-[11px] font-mono fill-zinc-500"
              >
                Peer A (React)
              </text>

              <rect
                x="40"
                y="150"
                width="100"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="90"
                y="180"
                textAnchor="middle"
                className="text-[11px] font-mono fill-zinc-500"
              >
                Peer B (React)
              </text>

              {/* Backend Cluster */}
              <rect
                x="240"
                y="60"
                width="220"
                height="120"
                rx="8"
                className="fill-white stroke-accent"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text
                x="350"
                y="45"
                textAnchor="middle"
                className="text-[12px] font-bold fill-accent uppercase tracking-widest"
              >
                FastAPI Cluster
              </text>

              <rect
                x="260"
                y="80"
                width="180"
                height="40"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="350"
                y="105"
                textAnchor="middle"
                className="text-[11px] font-mono fill-dark-700"
              >
                Socket.io (Signaling)
              </text>

              <rect
                x="260"
                y="130"
                width="180"
                height="40"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="350"
                y="155"
                textAnchor="middle"
                className="text-[11px] font-mono fill-dark-700"
              >
                Beanie (MongoDB ODM)
              </text>

              {/* Support Systems */}
              <rect
                x="540"
                y="60"
                width="120"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="600"
                y="90"
                textAnchor="middle"
                className="text-[11px] font-mono fill-zinc-500"
              >
                Redis (Presence)
              </text>

              <rect
                x="540"
                y="130"
                width="120"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="600"
                y="160"
                textAnchor="middle"
                className="text-[11px] font-mono fill-zinc-500"
              >
                MongoDB Atlas
              </text>

              {/* P2P Line */}
              <path
                d="M140 65 Q 190 65, 190 120 T 140 175"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="6 3"
              />
              <text
                x="195"
                y="125"
                className="text-[10px] fill-red-500 font-bold uppercase"
              >
                WebRTC Stream
              </text>

              {/* Signaling Lines */}
              <line
                x1="140"
                y1="70"
                x2="260"
                y2="100"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="140"
                y1="170"
                x2="260"
                y2="105"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="440"
                y1="100"
                x2="540"
                y2="85"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="440"
                y1="150"
                x2="540"
                y2="155"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />

              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#a1a1aa" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      );
    }

    if (type === "database") {
      return (
        <div className="my-8 overflow-x-auto">
          <div className="min-w-[800px] flex justify-center py-10 bg-light-100 rounded-lg border border-light-200">
            <svg
              width="800"
              height="280"
              viewBox="0 0 800 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* User Document */}
              <rect
                x="20"
                y="20"
                width="200"
                height="150"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <rect
                x="20"
                y="20"
                width="200"
                height="30"
                rx="4"
                className="fill-zinc-100"
              />
              <text
                x="120"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                User Document
              </text>
              <text
                x="35"
                y="65"
                className="text-[10px] font-mono fill-zinc-500"
              >
                _id: ObjectId
              </text>
              <text
                x="35"
                y="85"
                className="text-[10px] font-mono fill-zinc-500"
              >
                public_key: String
              </text>
              <text
                x="35"
                y="105"
                className="text-[10px] font-mono fill-zinc-500"
              >
                last_seen: DateTime
              </text>
              <text
                x="35"
                y="125"
                className="text-[10px] font-mono fill-zinc-500"
              >
                is_online: Boolean (Redis synced)
              </text>

              {/* Conversation Document */}
              <rect
                x="300"
                y="20"
                width="200"
                height="150"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <rect
                x="300"
                y="20"
                width="200"
                height="30"
                rx="4"
                className="fill-zinc-100"
              />
              <text
                x="400"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                Conversation
              </text>
              <text
                x="315"
                y="65"
                className="text-[10px] font-mono fill-zinc-500"
              >
                _id: ObjectId
              </text>
              <text
                x="315"
                y="85"
                className="text-[10px] font-mono fill-zinc-500"
              >
                member_ids: [ObjectId]
              </text>
              <text
                x="315"
                y="105"
                className="text-[10px] font-mono fill-zinc-500 italic text-accent"
              >
                last_message: MessageSnapshot
              </text>
              <text
                x="315"
                y="125"
                className="text-[10px] font-mono fill-zinc-500"
              >
                unread_counts: Map
              </text>

              {/* Message Document */}
              <rect
                x="580"
                y="20"
                width="200"
                height="180"
                rx="4"
                className="fill-white stroke-accent/20"
                strokeWidth="1"
              />
              <rect
                x="580"
                y="20"
                width="200"
                height="30"
                rx="4"
                className="fill-accent/5"
              />
              <text
                x="680"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-accent"
              >
                Encrypted Message
              </text>
              <text
                x="595"
                y="65"
                className="text-[10px] font-mono fill-zinc-500"
              >
                _id: ObjectId
              </text>
              <text
                x="595"
                y="85"
                className="text-[10px] font-mono fill-zinc-500"
              >
                encrypted_content: String
              </text>
              <text
                x="595"
                y="105"
                className="text-[10px] font-mono fill-zinc-500"
              >
                nonce: String
              </text>
              <text
                x="595"
                y="125"
                className="text-[10px] font-mono fill-zinc-500 font-bold"
              >
                status: Enum (sent|read)
              </text>
              <text
                x="595"
                y="145"
                className="text-[10px] font-mono fill-zinc-500"
              >
                created_at: DateTime
              </text>

              {/* Connections */}
              <path d="M220 80 H300" stroke="#e5e7eb" strokeDasharray="4 2" />
              <path d="M500 80 H580" stroke="#e5e7eb" strokeDasharray="4 2" />
            </svg>
          </div>
        </div>
      );
    }

    if (type === "signaling") {
      return (
        <div className="my-8 overflow-x-auto">
          <div className="min-w-[700px] flex justify-center py-10 bg-light-100 rounded-lg border border-light-200">
            <svg
              width="700"
              height="300"
              viewBox="0 0 700 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="100"
                y1="40"
                x2="100"
                y2="260"
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <line
                x1="350"
                y1="40"
                x2="350"
                y2="260"
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <line
                x1="600"
                y1="40"
                x2="600"
                y2="260"
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text
                x="100"
                y="30"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                Caller (Peer A)
              </text>
              <text
                x="350"
                y="30"
                textAnchor="middle"
                className="text-[12px] font-bold fill-accent"
              >
                Signal Server
              </text>
              <text
                x="600"
                y="30"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                Receiver (Peer B)
              </text>
              <path
                d="M100 70 H350"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <text
                x="225"
                y="65"
                textAnchor="middle"
                className="text-[10px] font-mono fill-zinc-500 italic"
              >
                1. send_offer (SDP)
              </text>
              <path
                d="M350 90 H600"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <text
                x="475"
                y="85"
                textAnchor="middle"
                className="text-[10px] font-mono fill-zinc-500 italic"
              >
                2. incoming_offer
              </text>
              <path
                d="M600 130 H350"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <text
                x="475"
                y="125"
                textAnchor="middle"
                className="text-[10px] font-mono fill-zinc-500 italic"
              >
                3. send_answer (SDP)
              </text>
              <path
                d="M350 150 H100"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <text
                x="225"
                y="145"
                textAnchor="middle"
                className="text-[10px] font-mono fill-zinc-500 italic"
              >
                4. incoming_answer
              </text>
              <path
                d="M100 190 H350"
                stroke="#ef4444"
                markerEnd="url(#arrowhead-red)"
                opacity="0.6"
              />
              <path
                d="M350 210 H600"
                stroke="#ef4444"
                markerEnd="url(#arrowhead-red)"
                opacity="0.6"
              />
              <text
                x="350"
                y="200"
                textAnchor="middle"
                className="text-[10px] font-mono fill-red-500 font-bold uppercase"
              >
                ICE Trickle
              </text>
              <rect
                x="150"
                y="240"
                width="400"
                height="30"
                rx="4"
                className="fill-accent/5 stroke-accent/20"
              />
              <text
                x="350"
                y="260"
                textAnchor="middle"
                className="text-[11px] font-bold fill-accent uppercase tracking-widest"
              >
                P2P PeerConnection Established
              </text>
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#a1a1aa" />
                </marker>
                <marker
                  id="arrowhead-red"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      );
    }

    if (type === "webrtc-p2p") {
      return (
        <div className="my-8 overflow-x-auto">
          <div className="min-w-[700px] flex justify-center py-10 bg-light-100 rounded-lg border border-light-200">
            <svg
              width="700"
              height="240"
              viewBox="0 0 700 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="40"
                y="40"
                width="160"
                height="150"
                rx="6"
                className="fill-white stroke-light-300"
              />
              <text
                x="120"
                y="30"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                Peer A Node
              </text>
              <rect
                x="55"
                y="60"
                width="130"
                height="30"
                rx="4"
                className="fill-zinc-50 stroke-light-200"
              />
              <text
                x="120"
                y="80"
                textAnchor="middle"
                className="text-[10px] font-mono fill-zinc-500"
              >
                LocalStream (Cam/Mic)
              </text>
              <rect
                x="55"
                y="100"
                width="130"
                height="30"
                rx="4"
                className="fill-zinc-50 stroke-light-200"
              />
              <text
                x="120"
                y="120"
                textAnchor="middle"
                className="text-[10px] font-mono fill-zinc-500"
              >
                RTCPeerConnection
              </text>
              <rect
                x="500"
                y="40"
                width="160"
                height="150"
                rx="6"
                className="fill-white stroke-light-300"
              />
              <text
                x="580"
                y="30"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                Peer B Node
              </text>
              <rect
                x="515"
                y="60"
                width="130"
                height="30"
                rx="4"
                className="fill-zinc-50 stroke-light-200"
              />
              <text
                x="580"
                y="80"
                textAnchor="middle"
                className="text-[10px] font-mono fill-zinc-500"
              >
                RemoteStream
              </text>
              <rect
                x="515"
                y="100"
                width="130"
                height="30"
                rx="4"
                className="fill-zinc-50 stroke-light-200"
              />
              <text
                x="580"
                y="120"
                textAnchor="middle"
                className="text-[10px] font-mono fill-zinc-500"
              >
                Video Renderer
              </text>
              <rect
                x="240"
                y="90"
                width="220"
                height="50"
                rx="25"
                className="fill-accent/5 stroke-accent/20"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <text
                x="350"
                y="120"
                textAnchor="middle"
                className="text-[11px] font-bold fill-accent italic tracking-widest uppercase"
              >
                P2P Media Plane (SRTP)
              </text>
              <path
                d="M200 115 H240"
                stroke="#ef4444"
                markerEnd="url(#arrowhead)"
              />
              <path
                d="M460 115 H500"
                stroke="#ef4444"
                markerEnd="url(#arrowhead)"
              />
              <circle
                cx="350"
                cy="180"
                r="30"
                className="fill-white stroke-light-300"
              />
              <text
                x="350"
                y="185"
                textAnchor="middle"
                className="text-[10px] font-bold fill-zinc-400"
              >
                STUN
              </text>
              <line x1="120" y1="190" x2="320" y2="180" stroke="#d4d4d8" />
              <line x1="580" y1="190" x2="380" y2="180" stroke="#d4d4d8" />
            </svg>
          </div>
        </div>
      );
    }
  }

  // Nexa Specific Diagrams
  if (projectSlug === "nexa-social") {
    if (type === "architecture") {
      return (
        <div className="my-8 overflow-x-auto">
          <div className="min-w-[700px] flex justify-center py-10 bg-light-100 rounded-lg border border-light-200">
            <svg
              width="700"
              height="260"
              viewBox="0 0 700 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Frontend - Canvas Engine */}
              <rect
                x="40"
                y="50"
                width="220"
                height="170"
                rx="8"
                className="fill-white stroke-accent"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text
                x="150"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-accent uppercase tracking-widest"
              >
                Story Creator Engine
              </text>

              <rect
                x="60"
                y="70"
                width="180"
                height="35"
                rx="4"
                className="fill-zinc-50 stroke-light-300"
              />
              <text
                x="150"
                y="92"
                textAnchor="middle"
                className="text-[10px] font-mono fill-dark-700"
              >
                Logical Canvas (1080p)
              </text>

              <rect
                x="60"
                y="115"
                width="180"
                height="35"
                rx="4"
                className="fill-zinc-50 stroke-light-300"
              />
              <text
                x="150"
                y="137"
                textAnchor="middle"
                className="text-[10px] font-mono fill-dark-700"
              >
                Scaling Layer (CSS Mix)
              </text>

              <rect
                x="60"
                y="160"
                width="180"
                height="35"
                rx="4"
                className="fill-zinc-50 stroke-light-300"
              />
              <text
                x="150"
                y="182"
                textAnchor="middle"
                className="text-[10px] font-mono fill-dark-700"
              >
                JPEG Export (0.85)
              </text>

              {/* API and Processing */}
              <rect
                x="340"
                y="105"
                width="140"
                height="60"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="410"
                y="140"
                textAnchor="middle"
                className="text-[12px] font-mono fill-dark-700 font-bold uppercase tracking-wider"
              >
                FastAPI
              </text>

              {/* External Services */}
              <rect
                x="540"
                y="40"
                width="120"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="600"
                y="70"
                textAnchor="middle"
                className="text-[11px] font-mono fill-zinc-500"
              >
                Cloudinary (CDN)
              </text>

              <rect
                x="540"
                y="105"
                width="120"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="600"
                y="135"
                textAnchor="middle"
                className="text-[11px] font-mono fill-zinc-500"
              >
                Redis (Catering)
              </text>

              <rect
                x="540"
                y="170"
                width="120"
                height="50"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <text
                x="600"
                y="200"
                textAnchor="middle"
                className="text-[11px] font-mono fill-zinc-500"
              >
                PostgreSQL
              </text>

              {/* Flow Lines */}
              <line
                x1="260"
                y1="135"
                x2="340"
                y2="135"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="480"
                y1="125"
                x2="540"
                y2="75"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="480"
                y1="135"
                x2="540"
                y2="135"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="480"
                y1="145"
                x2="540"
                y2="195"
                stroke="#a1a1aa"
                markerEnd="url(#arrowhead)"
              />

              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#a1a1aa" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      );
    }

    if (type === "database") {
      return (
        <div className="my-8 overflow-x-auto">
          <div className="min-w-[800px] flex justify-center py-10 bg-light-100 rounded-lg border border-light-200">
            <svg
              width="800"
              height="280"
              viewBox="0 0 800 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* User Table */}
              <rect
                x="20"
                y="20"
                width="180"
                height="130"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <rect
                x="20"
                y="20"
                width="180"
                height="30"
                rx="4"
                className="fill-zinc-100"
              />
              <text
                x="110"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                User Table
              </text>
              <text
                x="35"
                y="65"
                className="text-[10px] font-mono fill-zinc-500"
              >
                id: Integer (PK)
              </text>
              <text
                x="35"
                y="85"
                className="text-[10px] font-mono fill-zinc-500"
              >
                username: String
              </text>
              <text
                x="35"
                y="105"
                className="text-[10px] font-mono fill-zinc-500"
              >
                bio: Text
              </text>
              <text
                x="35"
                y="125"
                className="text-[10px] font-mono fill-zinc-500"
              >
                last_login: DateTime
              </text>

              {/* Story Table */}
              <rect
                x="310"
                y="20"
                width="180"
                height="180"
                rx="4"
                className="fill-white stroke-accent/20"
                strokeWidth="1"
              />
              <rect
                x="310"
                y="20"
                width="180"
                height="30"
                rx="4"
                className="fill-accent/5"
              />
              <text
                x="400"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-accent"
              >
                Story Entity
              </text>
              <text
                x="325"
                y="65"
                className="text-[10px] font-mono fill-zinc-500"
              >
                id: UUID (PK)
              </text>
              <text
                x="325"
                y="85"
                className="text-[10px] font-mono fill-zinc-500"
              >
                author_id: FK(User)
              </text>
              <text
                x="325"
                y="105"
                className="text-[10px] font-mono fill-zinc-500 italic"
              >
                media_url: String
              </text>
              <text
                x="325"
                y="125"
                className="text-[10px] font-mono fill-zinc-500"
              >
                duration_ms: Integer
              </text>
              <text
                x="325"
                y="145"
                className="text-[10px] font-mono fill-zinc-500"
              >
                expires_at: DateTime
              </text>
              <text
                x="325"
                y="165"
                className="text-[10px] font-mono fill-zinc-500"
              >
                is_deleted: Boolean
              </text>

              {/* Post/Interaction Table */}
              <rect
                x="600"
                y="20"
                width="180"
                height="150"
                rx="4"
                className="fill-white stroke-light-300"
              />
              <rect
                x="600"
                y="20"
                width="180"
                height="30"
                rx="4"
                className="fill-zinc-100"
              />
              <text
                x="690"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-bold fill-dark-700"
              >
                Interaction Log
              </text>
              <text
                x="615"
                y="65"
                className="text-[10px] font-mono fill-zinc-500"
              >
                user_id: FK(User)
              </text>
              <text
                x="615"
                y="85"
                className="text-[10px] font-mono fill-zinc-500"
              >
                target_id: UUID
              </text>
              <text
                x="615"
                y="105"
                className="text-[10px] font-mono fill-zinc-500 font-bold"
              >
                type: Enum (LIKE|VIEW)
              </text>
              <text
                x="615"
                y="125"
                className="text-[10px] font-mono fill-zinc-500"
              >
                device: String
              </text>

              {/* Connections */}
              <path d="M200 80 H310" stroke="#e5e7eb" strokeDasharray="4 2" />
              <path d="M490 80 H600" stroke="#e5e7eb" strokeDasharray="4 2" />
            </svg>
          </div>
        </div>
      );
    }
  }

  // Generic Placeholder logic (for other projects without custom diagrams yet)
  if (type === "architecture") {
    return (
      <div className="my-8 overflow-x-auto">
        <div className="min-w-[600px] flex justify-center py-8 bg-light-100 rounded-lg border border-light-200">
          <svg
            width="600"
            height="200"
            viewBox="0 0 600 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Generic Architecture boxes etc. */}
            <rect
              x="20"
              y="70"
              width="120"
              height="60"
              rx="4"
              className="fill-white stroke-light-300"
            />
            <text
              x="80"
              y="105"
              textAnchor="middle"
              className="text-[12px] font-mono fill-dark-700 uppercase tracking-wider"
            >
              Client App
            </text>
            <rect
              x="180"
              y="70"
              width="120"
              height="60"
              rx="4"
              className="fill-white stroke-accent"
              strokeWidth="2"
            />
            <text
              x="240"
              y="105"
              textAnchor="middle"
              className="text-[12px] font-mono fill-dark-700 uppercase tracking-wider"
            >
              API Layer
            </text>
            <rect
              x="340"
              y="70"
              width="120"
              height="60"
              rx="4"
              className="fill-white stroke-light-300"
            />
            <text
              x="400"
              y="105"
              textAnchor="middle"
              className="text-[12px] font-mono fill-dark-700 uppercase tracking-wider"
            >
              Data Store
            </text>
            <line
              x1="140"
              y1="100"
              x2="180"
              y2="100"
              stroke="#a1a1aa"
              markerEnd="url(#arrowhead)"
            />
            <line
              x1="300"
              y1="100"
              x2="340"
              y2="100"
              stroke="#a1a1aa"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#a1a1aa" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "database") {
    return (
      <div className="my-8 overflow-x-auto">
        <div className="min-w-[600px] flex justify-center py-8 bg-light-100 rounded-lg border border-light-200">
          <svg
            width="500"
            height="150"
            viewBox="0 0 500 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Generic DB Table visualization */}
            <rect
              x="20"
              y="20"
              width="150"
              height="110"
              rx="4"
              className="fill-white stroke-light-300"
            />
            <rect
              x="20"
              y="20"
              width="150"
              height="30"
              rx="4"
              className="fill-light-200"
            />
            <text
              x="95"
              y="40"
              textAnchor="middle"
              className="text-[12px] font-bold fill-dark-700"
            >
              Table Schema
            </text>
            <text x="30" y="65" className="text-[11px] font-mono fill-zinc-500">
              id: UUID (PK)
            </text>
            <text x="30" y="85" className="text-[11px] font-mono fill-zinc-500">
              field_a: String
            </text>
            <text
              x="30"
              y="105"
              className="text-[11px] font-mono fill-zinc-500"
            >
              created_at: TS
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
