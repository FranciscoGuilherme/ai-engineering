import express from 'express'
import router from './infra/controller/router';

const app = express();

app.use(express.json())
app.use(router)
app.listen(8080, () => 'server running on port 8080')
