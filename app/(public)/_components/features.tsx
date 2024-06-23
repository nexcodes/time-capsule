import {
  CalendarCheck,
  Camera,
  MessageCircleHeart,
  MonitorSmartphone,
  PersonStanding,
  ShieldCheck,
} from 'lucide-react';

/* eslint-disable @next/next/no-img-element */
export default function Features() {
  const features = [
    {
      Icon: Camera,
      title: 'Capture Memories in Diverse Formats',
      desc: 'Preserve your memories in a rich tapestry of media, including photos, videos, audio recordings, text entries, and even 3D objects. Let your time capsule be a true reflection of your experiences.',
    },
    {
      Icon: PersonStanding,
      title: 'Curate with Personalization',
      desc: 'Design your time capsule to match your unique style and preferences. Choose from a variety of templates, customize layouts, and add personal touches to make it truly yours.',
    },
    {
      Icon: CalendarCheck,
      title: 'Schedule Future Delivery',
      desc: "Set the perfect time for your time capsule to be opened. Whether it's a year, a decade, or even a century from now, your memories will be delivered exactly when you want them to be.",
    },
    {
      Icon: MessageCircleHeart,
      title: 'Share with Loved Ones',
      desc: 'Invite your family and friends to contribute to your time capsule. Share memories, add their own perspectives, and create a collective treasure trove of shared experiences.',
    },
    {
      Icon: ShieldCheck,
      title: 'Secure and Private',
      desc: 'Your memories deserve the utmost protection. Rest assured that your time capsule is safeguarded with robust security measures, ensuring that only authorized individuals can access it.',
    },
    {
      Icon: MonitorSmartphone,
      title: 'Accessible Across Devices',
      desc: "Access your time capsule anytime, anywhere. Whether you're on your computer, tablet, or smartphone, your memories are always at your fingertips.",
    },
  ];

  return (
    <section className='py-14 relative'>
      <img
        src='/images/bg.avif'
        className='absolute z-2 -top-0 left-10 opacity-50'
        alt=''
      />
      <div className='max-w-screen-xl mx-auto px-4 text-gray-900 md:px-8'>
        <div className='relative max-w-2xl mx-auto sm:text-center'>
          <div className='relative z-10'>
            <h3 className='text-gray-700 text-3xl font-semibold sm:text-4xl lg:text-5xl font-geist tracking-tighter'>
              Explore Our Powerful Features
            </h3>
          </div>
          <div
            className='absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]'
            style={{
              background:
                'linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)',
            }}
          ></div>
        </div>
        <hr className='bg-black/30 h-px w-1/2 mx-auto  mt-5' />
        <div className='relative mt-12'>
          <ul className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((item, idx) => (
              <li
                key={idx}
                className='bg-transparent transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]  space-y-3 p-4 border rounded-xl'
              >
                <div className='text-purple-600 rounded-full p-4 transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] w-fit'>
                  <item.Icon size={24} />
                </div>
                <h4 className='text-lg text-gray-600 font-bold font-geist tracking-tighter'>
                  {item.title}
                </h4>
                <p className='text-gray-800'>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
