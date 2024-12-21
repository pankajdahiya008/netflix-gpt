import { HfInference } from "@huggingface/inference";

const hfclient = new HfInference(process.env.REACT_APP_HF_KEY);

export default hfclient;
