import { useEffect, useRef } from "react";

export function Receiver() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://10.11.12.10:8080");

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "receiver" }));

      // Create peer connection immediately
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          ws.send(
            JSON.stringify({
              type: "iceCandidate",
              candidate: event.candidate,
            })
          );
        }
      };

      pc.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      pcRef.current = pc;
    };

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      const pc = pcRef.current;
      if (!pc) return;

      if (message.type === "createOffer") {
        await pc.setRemoteDescription(message.sdp);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        ws.send(JSON.stringify({ type: "createAnswer", sdp: answer }));
      }

      if (message.type === "iceCandidate" && message.candidate) {
        await pc.addIceCandidate(message.candidate);
      }
    };
  }, []);

  return (
    <div>
      <h2>Receiver</h2>
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
}
