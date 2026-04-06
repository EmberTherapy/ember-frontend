import '@/app/(auth)/auth.css';

export default function InvalidPage() {
    return (
        <div className="invalid-container">
            <h1>Invalid or Expired Link</h1>
            <p>This invitation link is no longer valid. Please request a new one or contact your therapist.</p>
        </div>
    )
}