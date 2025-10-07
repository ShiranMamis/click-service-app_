'use client';
import React, { useState, useEffect, useRef } from 'react';

const FallingAnimation = ({ imageUrl }) => {
    const [items, setItems] = useState([]);
    const requestRef = useRef();
    const previousTimeRef = useRef();

    useEffect(() => {
        const columns = 4; // הפחתת מספר העמודות
        const rows = 2; // הפחתת מספר השורות
        const newItems = Array.from({ length: columns * rows }, (_, i) => {
            const columnWidth = 100 / columns;
            const xBase = (i % columns) * columnWidth;

            return {
                id: i,
                x: xBase + Math.random() * (columnWidth - 10), // רנדומלי בתוך עמודה
                y: Math.random() * 100, // התחלה מיידית בטווח גלוי (חלקם מעל המסך)
                size: Math.random() * 30 + 30,
                speed: 6000, // מהירות איטית יותר
                rotation: Math.random() * 360,
            };
        });
        setItems(newItems);

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    const animate = (time) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;

            setItems((prevItems) =>
                prevItems.map((item) => {
                    let newY = item.y + (deltaTime * item.speed) / 900000; // האטה נוספת של תנועה
                    if (newY > 100) {
                        newY = newY - 100; // תנועה לולאתית רציפה
                    }
                    return {
                        ...item,
                        y: newY,
                        rotation: (item.rotation + deltaTime / 120) % 360, // סיבוב איטי יותר
                    };
                })
            );
        }

        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden bg-custom-ombre">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="absolute transition-opacity duration-300"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        width: item.size,
                        height: item.size,
                        transform: `rotate(${item.rotation}deg)`,
                        opacity: item.y > 80 ? 1 - (item.y - 80) / 20 : 1,
                        filter: `blur(${item.y > 80 ? (item.y - 80) / 5 : 0}px)`,
                    }}
                >
                    <img
                        src={imageUrl}
                        alt=""
                        className="w-full h-full object-contain"
                    />
                </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-4/5 bg-gradient-to-t from-white to-transparent opacity-70 pointer-events-none" />
        </div>
    );
};

export default FallingAnimation;
