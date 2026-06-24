import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [isLoginState, setIsLoginState] = useState(true);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const eyeLRef = useRef<HTMLDivElement>(null);
  const eyeRRef = useRef<HTMLDivElement>(null);
  const handLRef = useRef<HTMLDivElement>(null);
  const handRRef = useRef<HTMLDivElement>(null);

  const normalEyeStyle = () => {
    if (eyeLRef.current) eyeLRef.current.style.cssText = `left: 0.6em; top: 0.6em;`;
    if (eyeRRef.current) eyeRRef.current.style.cssText = `right: 0.6em; top: 0.6em;`;
  };

  const normalHandStyle = () => {
    if (handLRef.current)
      handLRef.current.style.cssText = `height: 2.81em; top: 6.7em; left: 7.5em; transform: rotate(0deg);`;
    if (handRRef.current)
      handRRef.current.style.cssText = `height: 2.81em; top: 6.7em; right: 7.5em; transform: rotate(0deg);`;
  };

  const coverEyesStyle = () => {
    if (handLRef.current)
      handLRef.current.style.cssText = `height: 6.56em; top: 3.87em; left: 11.75em; transform: rotate(-155deg);`;
    if (handRRef.current)
      handRRef.current.style.cssText = `height: 6.56em; top: 3.87em; right: 11.75em; transform: rotate(155deg);`;
  };

  useEffect(() => {
    normalEyeStyle();
    normalHandStyle();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLoginState) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const css = `
.panda-wrapper * { padding: 0; margin: 0; box-sizing: border-box; }
.panda-wrapper .panda-container { height: 31.25em; width: 31.25em; position: relative; }
.panda-wrapper .panda-face { height: 7.5em; width: 8.4em; background-color: #ffffff; border: 0.18em solid #2e0d30; border-radius: 7.5em 7.5em 5.62em 5.62em; position: absolute; top: 1.25em; margin: auto; left: 0; right: 0; z-index: 10}
.panda-wrapper .ear-l, .panda-wrapper .ear-r { background-color: #3f3554; height: 2.5em; width: 2.81em; border: 0.18em solid #2e0d30; border-radius: 2.5em 2.5em 0 0; top: 0.75em; position: absolute; }
.panda-wrapper .ear-l { transform: rotate(-38deg); left: 10.75em; }
.panda-wrapper .ear-r { transform: rotate(38deg); right: 10.75em; }
.panda-wrapper .blush-l, .panda-wrapper .blush-r { background-color: #ff8bb1; height: 1em; width: 1.37em; border-radius: 50%; position: absolute; top: 4em; }
.panda-wrapper .blush-l { left: 1em; transform: rotate(25deg); }
.panda-wrapper .blush-r { right: 1em; transform: rotate(-25deg); }
.panda-wrapper .eye-l, .panda-wrapper .eye-r { background-color: #3f3554; height: 2.18em; width: 2em; border-radius: 2em; position: absolute; top: 2.18em; }
.panda-wrapper .eye-l { left: 1.37em; transform: rotate(-20deg); }
.panda-wrapper .eye-r { right: 1.37em; transform: rotate(20deg); }
.panda-wrapper .eyeball-l, .panda-wrapper .eyeball-r { height: 0.6em; width: 0.6em; background-color: #ffffff; border-radius: 50%; position: absolute; left: 0.6em; top: 0.6em; transition: 1s all; }
.panda-wrapper .nose { height: 1em; width: 1em; background-color: #3f3554; position: absolute; top: 4.37em; left: 0; right: 0; margin: auto; border-radius: 1.2em 0 0 0.25em; transform: rotate(45deg); }
.panda-wrapper .mouth { height: 0.75em; width: 0.93em; background-color: transparent; border-radius: 50%; box-shadow: 0 0.18em #3f3554; position: absolute; top: 5.31em; left: 3.12em; }
.panda-wrapper .mouth:before { content: ""; height: 0.75em; width: 0.93em; background-color: transparent; border-radius: 50%; box-shadow: 0 0.18em #3f3554; position: absolute; left: 0.87em; }

.panda-wrapper .hand-l, .panda-wrapper .hand-r {
  background-color: #3f3554;
  height: 2.81em;
  width: 2.5em;
  border: 0.18em solid #2e0d30;
  border-radius: 0.6em 0.6em 2.18em 2.18em;
  transition: 1s all;
  position: absolute;
  top: 7.4em;
}
.panda-wrapper .hand-l { left: 7.5em; z-index: 20; }
.panda-wrapper .hand-r { right: 7.5em; z-index: 20; }

.panda-wrapper .paw-l, .panda-wrapper .paw-r {
  background-color: #3f3554;
  height: 3.12em;
  width: 3.12em;
  z-index: 20;
  border: 0.18em solid #2e0d30;
  border-radius: 2.5em 2.5em 1.2em 1.2em;
  position: absolute;
  top: 31.16em;
}
.panda-wrapper .paw-l { left: 10em; }
.panda-wrapper .paw-r { right: 10em; }

@media screen and (max-width: 768px) { 
  .panda-wrapper .panda-container { font-size: 3.5vw; }
  .panda-wrapper .paw-l, .panda-wrapper .paw-r { top: 40.56em; }
}

@media screen and (max-width: 480px) {
  .panda-wrapper .panda-container { font-size: 3.3vw; }
}

@media screen and (min-width: 700px) and (max-width: 1024px) {
  .panda-wrapper { display: none !important; }
}
`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-50 to-white overflow-y-auto">
      <style>{css}</style>

      <div className="w-full max-w-2xl mx-auto py-8 mt-12 md:mt-0">
        
        {/* Logo Section */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <Link to="/" className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-80 transition-opacity">
            Smartmart
          </Link>
        </div>

        <div className="relative flex flex-col items-center">
          
          {/* Animated Panda */}
          <div className="panda-wrapper">
            <div className="panda-container">
              <div className="ear-l"></div>
              <div className="ear-r"></div>
              <div className="panda-face">
                <div className="blush-l"></div>
                <div className="blush-r"></div>
                <div className="eye-l"><div ref={eyeLRef} className="eyeball-l"></div></div>
                <div className="eye-r"><div ref={eyeRRef} className="eyeball-r"></div></div>
                <div className="nose"></div>
                <div className="mouth"></div>
              </div>

              <div ref={handLRef} className="hand-l"></div>
              <div ref={handRRef} className="hand-r"></div>

              <div className="paw-l"></div>
              <div className="paw-r"></div>
            </div>
          </div>

          {/* Form Card (Light Theme) */}
          <div className="mt-[-280px] xs:mt-[-300px] md:mt-[-370px] z-10 w-full max-w-md px-4 relative">
            <div className="bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-purple-100 rounded-2xl p-8">
              
              <h2 className="text-2xl font-bold text-zinc-800 text-center mb-2">
                {isLoginState ? "Welcome Back!" : "Create Account"}
              </h2>
              <p className="text-zinc-500 text-center text-sm mb-8 font-medium">
                {isLoginState ? "Sign in to continue" : "Join Smartmart today"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name Field (Only for Sign Up) */}
                {!isLoginState && (
                  <div>
                    <label className="text-zinc-700 font-semibold text-sm block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={normalHandStyle}
                      className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="Satinder Singh"
                      required
                    />
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="text-zinc-700 font-semibold text-sm block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={normalHandStyle}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-zinc-700 font-semibold text-sm block">Password</label>
                    {isLoginState && (
                      <button type="button" className="text-xs text-purple-600 hover:text-purple-700 font-medium hover:underline">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={coverEyesStyle}
                    onBlur={normalHandStyle}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:-translate-y-0.5 disabled:opacity-50 mt-4"
                >
                  {loading ? "Please wait..." : (isLoginState ? "Sign In" : "Create Account")}
                </button>

                {/* Toggle Login/Signup */}
                <div className="mt-8 text-center border-t border-zinc-100 pt-6">
                  <p className="text-sm text-zinc-500 font-medium">
                    {isLoginState ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      onClick={() => setIsLoginState(!isLoginState)}
                      className="text-purple-600 hover:text-purple-700 font-bold ml-1.5 hover:underline"
                    >
                      {isLoginState ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
