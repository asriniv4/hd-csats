import { createClient } from '@supabase/supabase-js';

const {
  CSATS_DATABASE_URL,
  CSATS_DATABASE_SECRET_API_KEY
} = process.env;

const supabase = createClient(CSATS_DATABASE_URL, CSATS_DATABASE_SECRET_API_KEY);

exports.handler = async function (event, context) {
  const thumbnameName = event.queryStringParameters

  let { data, error } = await supabase
    .storage
    .from('case-thumbnails')
    .download(thumbnameName);

  console.log(data, error);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // TODO: Tighten security here
    },
    body: data,
  };

}