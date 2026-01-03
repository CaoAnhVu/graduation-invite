'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, MousePointerClick, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GraduationInvite() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRealCard, setShowRealCard] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date('2026-01-09T10:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // HÀM BẮN PHÁO HOA NHIỀU ĐỢT
  const handleOpen = () => {
    setIsOpen(true);

    setTimeout(() => {
      setShowRealCard(true);

      // Đợt 1: Bắn tung tóe chính giữa
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#800000', '#FFD700', '#ffffff'],
      });

      // Đợt 2: Bắn từ góc trái (sau 200ms)
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.8 },
          colors: ['#FFD700', '#ffffff'],
        });
      }, 200);

      // Đợt 3: Bắn từ góc phải (sau 400ms)
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.8 },
          colors: ['#800000', '#ffffff'],
        });
      }, 400);

      // Đợt 4: Cơn mưa vàng (sau 700ms)
      setTimeout(() => {
        const end = Date.now() + 2 * 1000; // Bắn trong 2 giây
        const frame = () => {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFD700'],
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFD700'],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      }, 700);
    }, 1500);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#fdfaf6] flex items-center justify-center overflow-hidden p-4 font-sans text-slate-900">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-50 rounded-full blur-[80px] md:blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-yellow-50 rounded-full blur-[80px] md:blur-[120px] opacity-60"></div>
      </div>

      <AnimatePresence>
        {!showRealCard ? (
          /* GIAI ĐOẠN 1: PHONG BÌ */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, transition: { duration: 0.4 } }}
            className="relative z-20 w-full max-w-[550px]"
          >
            <div className="absolute -top-20 md:-top-32 left-0 right-0 text-center z-50 pointer-events-none">
              <motion.h2 animate={isOpen ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-pinyon text-[#800000] drop-shadow-md mb-2">
                Congratulations
              </motion.h2>
              <p className="text-[10px] md:text-xs font-montserrat tracking-[0.3em] uppercase font-bold text-gray-500">Class of 2025</p>
            </div>

            <div onClick={!isOpen ? handleOpen : undefined} className="relative w-full aspect-[1.45/1] cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-xl overflow-visible">
              <motion.div
                initial={{ y: 0 }}
                animate={isOpen ? { y: '-60%', zIndex: 45, scale: 0.95 } : { y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                className="absolute inset-x-4 md:inset-x-8 top-4 bottom-4 bg-white shadow-lg rounded-lg z-10 flex flex-col items-center justify-center border border-gray-100 p-4 md:p-6 text-center"
              >
                <GraduationCap size={40} className="text-[#800000] mb-2 md:mb-4 md:size-[60px]" />
                <h3 className="font-pinyon text-2xl md:text-4xl text-gray-800 leading-tight">Graduation Invite</h3>
                <p className="font-montserrat text-[8px] md:text-[10px] tracking-[0.2em] mt-2 md:mt-4 text-yellow-600 font-bold uppercase tracking-widest">Cao Anh Vũ</p>
              </motion.div>

              <div className="absolute inset-0 bg-[#f3f3f3] rounded-xl z-0 border border-gray-200"></div>

              <motion.div
                initial={{ rotateX: 0 }}
                animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 40 }}
                transition={{ duration: 0.6 }}
                className="absolute top-0 left-0 w-full h-[55%] bg-[#800000] clip-envelope-top origin-top shadow-md"
              ></motion.div>

              <div className="absolute inset-0 bg-[#a31d1d] clip-envelope-bottom z-30 shadow-inner rounded-xl flex items-center justify-center border-t border-red-400/30">
                {!isOpen && (
                  <div className="text-center text-white mt-8 md:mt-12 p-4">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                      <MousePointerClick size={32} className="mx-auto text-yellow-400 mb-2 md:size-[48px]" />
                    </motion.div>
                    <p className="font-pinyon text-2xl md:text-3xl tracking-wide">Mời Bạn Chung Vui</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* GIAI ĐOẠN 2: THIỆP CHÍNH THỨC */
          <div className="relative flex items-center justify-center w-full max-w-[1400px]">
            <motion.img
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              src="/char-left.png"
              className="hidden xl:block absolute left-[110px] bottom-0 w-[320px] z-10 select-none pointer-events-none object-contain"
              alt="Character Left"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="z-[100] w-full max-w-[540px] bg-white rounded-[30px] md:rounded-[45px] shadow-[0_30px_70px_rgba(0,0,0,0.2)] border-[6px] md:border-[10px] border-white relative overflow-y-auto max-h-[92vh] scrollbar-hide mx-auto"
            >
              <div className="h-44 md:h-60 bg-gray-100 relative overflow-hidden">
                <img src="/totnghiep.jpg" alt="Graduation" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90"></div>
                <div className="absolute top-4 right-4 bg-yellow-500 text-white p-2 md:p-3 rounded-full shadow-lg">
                  <GraduationCap size={16} className="md:size-[20px]" />
                </div>
              </div>

              <div className="p-6 md:p-10 text-center">
                <p className="text-[#a31d1d] font-bold tracking-[0.15em] text-[9px] md:text-[11px] mb-2 md:mb-4 font-montserrat uppercase leading-relaxed">Mời bạn đến dự lễ tốt nghiệp của</p>
                <h1 className="text-5xl md:text-[70px] font-pinyon text-gray-900 leading-[1.1] mb-4 md:mb-6">Cao Anh Vũ</h1>
                <div className="w-20 md:w-32 h-[1px] bg-yellow-500/50 mx-auto mb-6 md:mb-8 text-slate-900"></div>

                <div className="space-y-1 mb-6 md:mb-10 font-montserrat px-2">
                  <p className="text-lg md:text-xl font-bold text-gray-800 leading-tight">Kỹ sư Công nghệ thông tin</p>
                  <p className="text-gray-500 text-[10px] md:text-sm font-medium tracking-wide leading-relaxed">Chuyên ngành công nghệ phần mềm</p>
                  <p className="text-[#a31d1d] text-[11px] md:text-[13px] font-bold mt-2 uppercase tracking-tight">Đại học Công Nghệ TP.HCM (HUTECH)</p>
                </div>

                <div className="grid grid-cols-4 gap-2 md:gap-4 mb-8 md:mb-10">
                  {[
                    { val: timeLeft.days, label: 'NGÀY' },
                    { val: timeLeft.hours, label: 'GIỜ' },
                    { val: timeLeft.mins, label: 'PHÚT' },
                    { val: timeLeft.secs, label: 'GIÂY' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-full aspect-square bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
                        <span className="text-xl md:text-2xl font-black text-[#800000]">{item.val}</span>
                      </div>
                      <span className="text-[7px] md:text-[9px] font-bold text-gray-400 mt-1 md:mt-2 tracking-widest font-montserrat">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 md:space-y-4 text-left mb-8 md:mb-10 text-slate-900">
                  <div className="bg-[#fcfcfc] p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-50 shadow-sm flex items-center gap-3 md:gap-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow flex items-center justify-center text-[#800000] flex-shrink-0">
                      <Calendar size={18} className="md:size-[22px]" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest font-montserrat">Thời gian</p>
                      <p className="text-sm md:text-base font-bold text-gray-800 font-montserrat">Thứ Sáu, 09/01/2026</p>
                      <p className="text-[10px] md:text-xs text-gray-500 italic font-montserrat">10:00 AM - 12:00 PM</p>
                    </div>
                  </div>

                  <div className="bg-[#fcfcfc] p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-50 shadow-sm flex items-center gap-3 md:gap-5 text-slate-900">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow flex items-center justify-center text-[#800000] flex-shrink-0">
                      <MapPin size={18} className="md:size-[22px]" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest font-montserrat">Địa điểm</p>
                      <p className="text-sm md:text-base font-bold text-gray-800 font-montserrat leading-tight uppercase">Hội trường lớn tòa E1, HUTECH</p>
                      <p className="text-[9px] md:text-[10px] text-gray-400 font-medium font-montserrat mt-1">Khu CNC XLHN, Hiệp Phú, Thủ Đức, HCM</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 relative z-[110]">
                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    href="https://forms.gle/Njuh1K9JEJcTw4E18"
                    target="_blank"
                    className="block w-full bg-[#800000] text-white py-4 md:py-5 rounded-xl md:rounded-[22px] font-extrabold shadow-xl tracking-[0.1em] uppercase text-[10px] md:text-xs hover:bg-[#600000] transition-all font-montserrat"
                  >
                    Xác nhận tham dự
                  </motion.a>
                  <button
                    onClick={() => window.open('https://maps.app.goo.gl/j6DzFXYGBXgHG3xo7')}
                    className="text-[#800000] text-[9px] md:text-[10px] font-bold flex items-center justify-center gap-2 hover:underline tracking-[0.1em] uppercase opacity-60 font-montserrat"
                  >
                    <MapPin size={12} /> Chỉ đường trên Google Maps
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.img
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              src="/char-left.png"
              className="hidden xl:block absolute right-[110px] bottom-0 w-[320px] z-10 select-none pointer-events-none scale-x-[-1] object-contain"
              alt="Character Right"
            />
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Montserrat:wght@400;500;600;700;900&display=swap');
        .font-pinyon {
          font-family: 'Pinyon Script', cursive;
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .clip-envelope-top {
          clip-path: polygon(0 0, 50% 75%, 100% 0);
        }
        .clip-envelope-bottom {
          clip-path: polygon(0 35%, 50% 100%, 100% 35%, 100% 100%, 0 100%);
        }
        body {
          touch-action: manipulation;
        }
      `}</style>
    </main>
  );
}
