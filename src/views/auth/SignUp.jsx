import InputField from "components/fields/InputField";
export default function SignUp(){

    return (
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* Register section */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Register
            </h4>
    
            {/* Full Name */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Full Name*"
              placeholder="John Doe"
              id="full-name"
              type="text"
            />
    
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
            />
    
            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
            />
    
            {/* Confirm Password */}
            <InputField
              variant="auth"
              extra="mb-4"
              label="Confirm Password*"
              placeholder="Min. 8 characters"
              id="confirm-password"
              type="password"
            />
            
            <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" >
              Register
            </button>
          </div>
        </div>
        
      );
}