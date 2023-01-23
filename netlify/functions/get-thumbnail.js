import { createClient } from '@supabase/supabase-js';

const {
  CSATS_DATABASE_URL,
  CSATS_DATABASE_SECRET_API_KEY
} = process.env;

const supabase = createClient(CSATS_DATABASE_URL, CSATS_DATABASE_SECRET_API_KEY);

exports.handler = async function (event, context) {
  console.log('in get-thumbnail')
  console.log(event.queryStringParameters)
  const thumbnameName = event.queryStringParameters['name'];
  console.log(thumbnameName);

  let { data, error } = await supabase.storage
    .from('case-thumbnails')
    .download(thumbnameName);

  if (error) {
    console.log(error)
  }

  console.log(data);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // TODO: Tighten security here
      "Content-Type": "image/png, application/octet-strean",
    },
    isBase64Encoded: true,
    body: data,
  };

}