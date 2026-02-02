const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb, {
              // useNewUrlParser: true,
              // useUnifiedTopology: true,
              // useCreateIndex: true,
              serverSelectionTimeoutMS: 30000,
              socketTimeoutMS: 45000,
          })
        //   .then(() => console.log('Database is connected'))
        //   .catch((error) => console.error('Database connection error', error))
        // await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        console.log('MongoDB Database connected');
    } catch (error) {
        console.error('MongoDB Database connection error:', error.message);
        process.exit(1);
    }
}

export default connectDB;