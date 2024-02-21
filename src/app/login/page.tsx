export default function LoginPage() {
    return (
        <div>
            <h1>Login</h1>
            <form action="/api/" method="post">
                <input type="text" name="username" />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}