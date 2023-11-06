class AuthController {
    static async getMe(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal error" })
        }
    }

    static async signUp(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal error" })
        }
    }

    static async signIn(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal error" })
        }
    }
}