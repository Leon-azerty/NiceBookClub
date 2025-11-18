interface EmailVerificationTemplateProps {
  firstName: string;
  url: string;
  token: string;
}

export function EmailVerificationTemplate({
  firstName,
  url,
  token,
}: EmailVerificationTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>url : {url}</p>
    </div>
  );
}

interface ResetPasswordTemplateProps {
  firstName: string;
  url: string;
  token: string;
}

export function ResetPasswordTemplate({
  firstName,
  url,
  token,
}: ResetPasswordTemplateProps) {
  return (
    <div>
      <h1>Password Reset Request</h1>
      <p>Hi {firstName},</p>
      <p>
        We received a request to reset your password. Click the link below to
        proceed:
      </p>
      <a href={url}>Reset Password</a>
    </div>
  );
}
