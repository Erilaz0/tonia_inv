import mongoose, { connection } from "mongoose";

const conn = {
    isConnected: 0
};

export async function connectMongoDB() {
    if (conn.isConnected) {
        console.log("Usando conexión existente a MongoDB");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        conn.isConnected = db.connections[0].readyState;
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}

connection.on("connected", () => {
    console.log("MongoDB está conectado");
});

connection.on("error", (error) => {
    console.error("Error en la conexión de MongoDB:", error);
});
