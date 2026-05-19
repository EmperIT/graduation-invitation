"use client";

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface IntroSequenceProps {
    onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const images = ['/next.svg', '/vercel.svg', '/file.svg'];

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
        exit: {
            opacity: 0,
            scale: 1.1, // Hơi zoom lên một chút rồi mờ đi trước khi vào thiệp
            transition: { duration: 0.8, ease: "easeInOut" },
        },
    };

    const baseDelay = 0.2;
    const cardDelay = 0.4; // Kéo dài độ trễ một chút để xem rõ từng ảnh bay vào
    const duration = 1.2;  // Animation dài hơn để tạo cảm giác rơi lơ lửng

    const cardVariants = {
        hidden: {
            opacity: 0,
            scale: 2.5,     // Ảnh bắt đầu rất to (như đang ở sát camera)
            y: -200,        // Rơi từ trên cao xuống
            z: 500,         // Tạo chiều sâu
            rotateX: 50,    // Ngửa ảnh ra sau
            rotateY: 20,
            rotateZ: 0,
        },
        visible: (i: number) => {
            // Toán học để tạo góc nghiêng (rotateZ) ngẫu nhiên cho mỗi ảnh khi hạ cánh
            // Ảnh chẵn nghiêng sang trái, ảnh lẻ nghiêng sang phải
            const tiltAngle = i % 2 === 0 ? (i * 6 + 4) : -(i * 5 + 3);

            // X dịch chuyển nhẹ để các ảnh không bị đè thẳng tâm lên nhau
            const xOffset = i % 2 === 0 ? (i * 10) : -(i * 10);

            return {
                opacity: 1,
                scale: 1,       // Trở về kích thước thật
                y: 0,           // Hạ cánh xuống giữa màn hình
                z: 0,
                x: xOffset,
                rotateX: 0,     // Dựng phẳng lại
                rotateY: 0,
                rotateZ: tiltAngle, // Nằm nghiêng lộn xộn
                transition: {
                    duration,
                    delay: baseDelay + i * cardDelay,
                    // Dùng spring để tạo độ nảy nhẹ khi ảnh "rơi" xuống mặt phẳng
                    type: "spring",
                    stiffness: 70,
                    damping: 15,
                    mass: 1.5,
                },
            };
        },
    };

    useEffect(() => {
        const total = baseDelay + (images.length - 1) * cardDelay + duration + 1;
        const t = setTimeout(() => onComplete(), total * 1000);
        return () => clearTimeout(t);
    }, [images.length, onComplete]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{ perspective: 1500 }} // Tăng perspective để hiệu ứng 3D mạnh hơn
        >
            <div className="relative w-72 h-[400px]">
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        // Thêm viền trắng dày và shadow to để giống ảnh Polaroid/Film
                        className="absolute inset-0 w-full h-full bg-white rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2"
                        style={{
                            zIndex: index, // Ảnh sau đè lên ảnh trước
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <div className="w-full h-full overflow-hidden bg-gray-200">
                            <img
                                src={src}
                                alt={`intro-${index}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}