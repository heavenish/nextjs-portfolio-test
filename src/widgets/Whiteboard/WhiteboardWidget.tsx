import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './WhiteboardWidget.module.scss';

type Point = {
  x: number;
  y: number;
};

type DrawingState = {
  lines: Point[][];
  color: string;
};

const WhiteboardWidget: React.FC = () => {
  const [drawingState, setDrawingState] = useState<DrawingState>({
    lines: [],
    color: '#000000',
  });
  const [drawing, setDrawing] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    socketRef.current = io('https://socketio-chat-h9jt.herokuapp.com/');
    socketRef.current.on('draw', (line: Point[]) => {
      setDrawingState((prevState) => ({
        ...prevState,
        lines: [...prevState.lines, line],
      }));
    });
    socketRef.current.on('clear', () => {
      setDrawingState({
        lines: [],
        color: '#000000',
      });
    });
    socketRef.current.emit('getDrawingState');
    socketRef.current.on('loadDrawingState', (state: DrawingState) => {
      setDrawingState(state);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;

    context.scale(devicePixelRatio, devicePixelRatio);
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = drawingState.color;
    context.lineWidth = 5;
    context.lineCap = 'round';

    drawingState.lines.forEach((line) => {
      context.beginPath();
      context.moveTo(line[0].x, line[0].y);
      for (let i = 1; i < line.length; i++) {
        context.lineTo(line[i].x, line[i].y);
      }
      context.stroke();
    });
  }, [drawingState]);
  const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setDrawingState((prevState) => ({
      ...prevState,
      lines: [...prevState.lines, [{ x, y }]],
    }));
    setDrawing(true);
  };

  const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setDrawingState((prevState) => {
      const lastLine = prevState.lines[prevState.lines.length - 1];
      return {
        ...prevState,
        lines: [...prevState.lines.slice(0, -1), [...lastLine, { x, y }]],
      };
    });

    const line = [
      {
        x: drawingState.lines[drawingState.lines.length - 1][
          drawingState.lines[drawingState.lines.length - 1].length - 1
        ].x,
        y: drawingState.lines[drawingState.lines.length - 1][
          drawingState.lines[drawingState.lines.length - 1].length - 1
        ].y,
      },
      { x, y },
    ];
    socketRef.current?.emit('draw', line);
  };

  const onMouseUp = () => {
    setDrawing(false);
  };

  const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrawingState((prevState) => ({
      ...prevState,
      color: event.target.value,
    }));
  };

  const onClearClick = () => {
    setDrawingState({
      lines: [],
      color: '#000000',
    });
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    socketRef.current?.emit('clear');
  };

  return (
    <div className={styles.whiteboardContainer}>
      <canvas
        className={styles.whiteboard}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
      <div className={styles.controls}>
        <input
          type="color"
          value={drawingState.color}
          onChange={onColorChange}
        />
        <button className={styles.clearButton} onClick={onClearClick}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default WhiteboardWidget;
