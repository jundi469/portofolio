import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact({ ref, callback }) {
  const [sended, setSended] = useState(false);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_q8k1bcg",
        "template_5h0hp53",
        form.current,
        "ibh7UlhK5UIqoM4_X"
      )
      .then(
        (result) => {
          callback(true, e.target.user_name.value);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <section className="flex justify-center z-10" ref={ref}>
      <div className="md:w-[80%]">
        <div className="w-full p-[3rem]">
          <div>
            <h1 className="text-[1.8rem] font-bold flex">
              Love to hear from you,
            </h1>
            <h1 className="text-[1.8rem] font-bold flex">
              Get in touch{" "}
              <span role="img" aria-label="waving hand">
                👋
              </span>
            </h1>
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="py-[2rem] space-y-[1rem]"
          >
            <div className="md:flex justify-between md:space-x-[2rem] space-y-[1rem] md:space-y-0">
              <div className="md:w-[50%] space-y-[.5rem]">
                <p className="text-black font-bold">Your Name</p>
                <input
                  name="user_name"
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-gray-100 px-6 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="md:w-[50%] space-y-[.5rem]">
                <p className="text-black font-bold">Your Email</p>
                <input
                  name="user_email"
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-gray-100 px-6 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <div className="space-y-[.5rem]">
              <p className="text-black font-bold">Message</p>
              <textarea
                name="message"
                placeholder="Message"
                className="w-full bg-gray-100 px-6 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-[2rem] py-[.5rem] md:w-[48%] w-full mt-[2rem]"
            >
              Send It{" "}
              <span role="img" aria-label="45-degree angled arrow pointing up">
                &#8599;
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
