import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const About = () => {
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg sm:text-xl">About ORIGIN</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Here you can view our T&C, Privacy Policy etc.
        </p>
      </div>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between bg-[var(--primary-color)] px-3 py-4 rounded-t-xl hover:bg-[var(--primary-hover)] cursor-pointer focus:outline-none"
        >
          <h1 className="text-white">About US</h1>
          {open ? (
            <ChevronUp className="text-[var(--primary-light)]" />
          ) : (
            <ChevronDown className="text-[var(--primary-light)]" />
          )}
        </button>
        {open && (
          <div>
            <p className="shadow p-4 rounded-b-lg text-gray-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Aspernatur tenetur architecto ipsa unde dolores nostrum optio
              debitis mollitia est esse veniam ab molestiae enim expedita nemo
              ratione ducimus, illo ipsum. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Odio dolorem, harum dolores
              voluptate nisi suscipit expedita laborum quo aspernatur, veritatis
              perferendis quam eius? Repellat pariatur, explicabo ea officia
              ipsam repudiandae.
            </p>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setTerms(!terms)}
          className="flex items-center justify-between bg-[var(--primary-color)]  px-3 py-4 w-full text-white rounded-t-xl"
        >
          <h1>Terms &amp; Conditions</h1>
          {terms ? <ChevronUp /> : <ChevronDown />}
        </button>
        {terms && (
          <div>
            <p className="shadow p-4 rounded-b-xl">
              Terms and conditions content goes here...
            </p>
          </div>
        )}
      </div>

      <div>
        <button
          className="flex items-center justify-between bg-[var(--primary-color)] px-3 py-4 w-full text-white rounded-t-xl"
          onClick={() => setPrivacy(!privacy)}
        >
          <h1>Privacy Policy</h1> {privacy ? <ChevronUp /> : <ChevronDown />}
        </button>

        {privacy && (
          <div>
            <p className="shadow p-4 rounded-b-xl">
              Privacy policy content goes here...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
