import '../chat.css'

export default function InvalidPage() {
    return (
        <div className="invalid-container">
            <div className="invalid-card">
                <h1>Invalid or Expired Link</h1>
                <p>This invitation link is no longer valid. Please request a new one or contact your therapist.</p>
            </div>
        </div>
    )
}