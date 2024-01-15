import React from "react";

function About() {
  return (
    <div id="about" className="mr-[22rem] py-8 flex items-start flex-col">
      <h2 className="text-5xl font-bold text-[#000] mb-8">من نحن</h2>

      <p className="text-black text-xl w-[50rem] mb-12">
        تتناول هذه المنصة تعليم قراءة القرآن الكريم على يد أمهر القراء
        والمعلمين، حيث تشدد على الأهمية الكبيرة لتلك الرحلة التعليمية. يتم تسليط
        الضوء على الأساليب التفاعلية والابتكارية التي تستخدمها المنصة لتسهيل
        عملية تعلم اللفظ الصحيح والتلاوة السليمة. يتم تسليط الضوء على الدور
        المحوري للمدرسين المؤهلين ودعمهم المستمر لضمان تقديم تجربة تعلم فريدة
        وفعالة. يختتم الموضوع بتحفيز الطلاب على الانضمام إلى هذه المنصة
        للاستمتاع برحلة ممتعة نحو إتقان قراءة القرآن الكريم وتحقيق اللفظ الصحيح.
      </p>
      <h2 className="font-bold text-black mb-8 text-3xl">ما يميز المنصة</h2>
      <ul className="list-disc">
        {/* color: #000; text-align: right; font-family: Tajawal; font-size: 22px;
        font-style: normal; font-weight: 500; line-height: normal; */}
        <li className="text-black text-2xl font-medium mb-6 mr-[2rem]">
          <span className="font-semibold">دروس تفاعلية وشيقة:</span>
          استمتع بتجارب تعلم محفزة تجمع بين التكنولوجيا والتعليم التقليدي.
        </li>
        <li className="text-black text-2xl font-medium mb-6 mr-[2rem]">
          <span className="font-semibold">تقييم فوري وتوجيه فردي:</span>
          احصل على تقييم فوري وتوجيه مهم من مدرسينا المؤهلين.
        </li>
        <li className="text-black text-2xl font-medium mb-6 mr-[2rem]">
          <span className="font-semibold">مدرسون ذوو خبرة:</span>
          تعلم من مدرسينا المحترفين واستفد من خبراتهم القيمة.
        </li>
        <li className="text-black text-2xl font-medium mb-6 mr-[2rem]">
          <span className="font-semibold">واجهة سهلة الاستخدام:</span>
          استمتع بتجربة تعلم سلسة وسهلة الاستخدام على منصتنا.
        </li>
        <li className="text-black text-2xl font-medium mb-6 mr-[2rem]">
          <span className="font-semibold">تقنيات تعلم متقدمة:</span>
          نحن نستخدم أحدث التقنيات لضمان تحقيق أفضل نتائج تعلم.
        </li>
      </ul>
      <p className="text-3xl font-medium leading-loose mt-12">
        انضم إلينا اليوم وابدأ رحلتك في تعلم قراءة القرآن الكريم. اكتشف الجمال
        والعمق في فنون قراءة القرآن مع منصتنا. انضم إلينا اليوم وابدأ رحلتك نحو
        إتقان التلاوة واللفظ الصحيح.
      </p>
    </div>
  );
}

export default About;
