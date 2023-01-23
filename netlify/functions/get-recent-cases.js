import { createClient } from '@supabase/supabase-js'

const {
  CSATS_DATABASE_URL,
  CSATS_DATABASE_SECRET_API_KEY
} = process.env;

const supabase = createClient(CSATS_DATABASE_URL, CSATS_DATABASE_SECRET_API_KEY);

exports.handler = async function (event, context) {
  let { data, error } = await supabase
    .from('cases')
    .select('id, primary_surgeon, secondary_surgeon, thumbmnail_location, video_url, patient_name, patient_dob, surgery_date')
    .limit(3)

  console.log(data, error);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // TODO: Tighten security here
    },
    body: JSON.stringify(data),
  };
};
