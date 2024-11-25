import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialization: 'Cardiologist',
      feedback: 'The Doc2You platform has been an excellent tool for connecting with patients and managing appointments more efficiently. I highly recommend it!',
      image: 'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=', 
    },
    {
      id: 2,
      name: 'Dr. Sarah Smith ',
      specialization: 'Pediatrician',
      feedback: 'I’ve been using Doc2You for a few months now, and it has made my practice much more streamlined. The AI-based symptom checker is a great addition.',
      image: 'https://media.istockphoto.com/id/479378798/photo/portrait-of-female-doctor.jpg?s=612x612&w=0&k=20&c=P-W8KSJBYhYj2RSx1Zhff6FCGvtRDC3AAzox8deMmew=', 
    },
    {
      id: 3,
      name: 'Dr. Alan Brown',
      specialization: 'Orthopedic Surgeon',
      feedback: 'This platform is exactly what we needed to keep up with the modern healthcare demands. It’s simple, intuitive, and effective for both doctors and patients.',
      image: 'https://thumbs.dreamstime.com/b/male-doctor-stethoscope-38075856.jpg', 
    },
  ];

  return (
    <div className="p-6 max-w-full mx-auto pt-10">
      <h2 className="text-3xl font-medium text-center text-gray-900 mb-12">Testimonials</h2>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-blue-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mr-4 transition-transform transform hover:scale-110 duration-300"
              />
              <div>
                <p className="font-medium text-gray-600">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.specialization}</p>
              </div>
            </div>
            <p className="text-gray-600 text-base">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
