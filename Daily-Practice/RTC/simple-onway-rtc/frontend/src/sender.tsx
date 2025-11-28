import { useEffect, useState } from "react";

export function Sender() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://10.11.12.10:8080");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "sender" }));
      setSocket(ws);
    };
  }, []);

  async function sendVideo() {
    if (!socket) return;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.send(JSON.stringify({ type: "createOffer", sdp: offer }));
    };

    //Detects  if there is any new iceCandidate
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: event.candidate })
        );
      }
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type == "createAnswer") {
        pc.setRemoteDescription(message.sdp);
      }
      if (message.type == "iceCandidate") {
        pc.addIceCandidate(message.candidate);
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    pc.addTrack(stream.getVideoTracks()[0], stream);
    pc.addTrack(stream.getAudioTracks()[0], stream);
  }

  return (
    <div>
      Hey I'm Sender
      <br />
      <button onClick={sendVideo}>Star Sending Video</button>
    </div>
  );
}
