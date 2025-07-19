import { Button } from "antd"

const EmailVerification = () => {
  return (
    <div className="w-full bg-white px-8 py-4 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-medium">Email Verification</h1>
      <p className="text-xs text-gray-500 my-4">
        Please enter your code that send to your email address
      </p>
      <form className="w-full">
        <input
          type="email"
          required
          placeholder="Enter code verification"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="w-full !py-5" type="primary" >Submit</Button>
      </form>
    </div>
  )
}

export default EmailVerification