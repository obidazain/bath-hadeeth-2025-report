import { motion } from 'framer-motion';

export function IntegralSocietySlide() {
  return (
    <div className="slide relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-900/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center z-10 max-w-5xl mx-auto w-full px-8">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8"
        >
          <span className="text-orange-500">المجتمع</span>{' '}أهم من الفرد وأكبر من الدولة
        </motion.h2>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
        >
          <p className="text-lg sm:text-xl leading-relaxed text-gray-700 text-right" style={{ textAlign: 'justify', direction: 'rtl' }}>
            إن فكرة وجود قوة واحدة مهيمنة تشرع وتحكم شؤون الناس لا تنسجم مع التصور التعددي للحركة في الكون منذ الخلق، ولذلك فسلطات الدولة يجب أن تقصى عن السيطرة والتحكم في القوى المجتمعية، يجب أن تتمدد أدوات المجتمع وأدواره في الفضاء العام، فتحجم النزعة الفردانية، وتعلى من مفهوم التكاتف والتآخي، وتمنع تأله الدولة، فتعطي الناس مساحات فاعلة في اللحظات الفارقة التي نمر بها مراراً وتكراراً، إن مشروع الدولة الحديثة لا يستطيع مفارقة السيطرة والإقصاء والعنصرية ونزع الفرد من مجموعه وذلك كجزء من تصوره لتسيير الحياة بالشكل الأمثل.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
