// NEEDS REFACTOR

// POST URL
// const postUrl = 'http://ec2-34-227-73-43.compute-1.amazonaws.com/submissions/batch?base64_encoded=true';

// testcases encoding to base64
const testcasestobase64 = (test) => {
  const testcases = [];
  try {
    for (const i of test) {
      const encoded_input = Buffer.from(i.input).toString('base64');
      const encoded_output = Buffer.from(i.output).toString('base64');
      const data = { input: encoded_input, output: encoded_output };
      testcases.push(data);
    }
  } catch (err) {
    console.log(err);
  }
  return testcases;
};

// source code encoding to base64
const codetobase64 = (source) => {
  let encoded_source = '';
  try {
    encoded_source = Buffer.from(source).toString('base64');
  } catch (err) {
    console.log(err);
  }
  return encoded_source;
};

// create required body data for create batch submission
const createBody = (test, source, lang) => {
  const encoded_code = codetobase64(source);
  const encoded_test = testcasestobase64(test);
  const data = [];
  for (const i of encoded_test) {
    const sub = {
      language_id: lang,
      source_code: encoded_code,
      stdin: i.input,
      expected_output: i.output,
    };
    data.push(sub);
  }
  const body = {
    submissions: data,
  };
  return body;
};

// create a URL for get batch submission
const createUrl = (responseTokens) => {
  switch (responseTokens.submissions[0].source_code) {
    case 'am9lbA==':
      return 'joel';
    case 'bWFjaGk=':
      return 'machi';
    case 'anVzdGlu':
      return 'justin';
    default:
      return 'name for running testcases was not defined';
  }
};

// function for creating a post submissionn
async function postData(data = {}) {
  return data;
}

// function for getting a get submissionn
async function getData(url = '') {
  // providing certain dictionary values for certain source_codes
  let temp_data;
  switch (url) {
    case 'joel': {
      temp_data = {
        submissions: [
          {
            language_id: 71,
            stdout: '0\n',
            status_id: 3,
            time: '0.068',
            stderr: null,
            token: '156e4908-e544-4cbf-960d-3ee84a5bdd68',
          },
          {
            language_id: 71,
            stdout: '1\n',
            status_id: 3,
            time: null,
            stderr: null,
            token: 'f866857b-1e38-4c06-a150-17c2540fdb48',
          },
          {
            language_id: 71,
            stdout: '2\n',
            status_id: 3,
            time: null,
            stderr: null,
            token: '264634dd-e961-4129-9e7f-4c4350f6a66a',
          },
          {
            language_id: 71,
            stdout: '3\n',
            status_id: 3,
            time: null,
            stderr: null,
            token: 'fcf6f4ab-de7d-405e-8166-7f4e1e959e3f',
          },
        ],
      };
      break;
    }
    case 'justin': {
      temp_data = {
        submissions: [
          {
            language_id: 71,
            stdout: '0\n',
            status_id: 3,
            time: '0.068',
            stderr: null,
            token: '156e4908-e544-4cbf-960d-3ee84a5bdd68',
          },
          {
            language_id: 71,
            stdout: '1\n',
            status_id: 3,
            time: null,
            stderr: null,
            token: 'f866857b-1e38-4c06-a150-17c2540fdb48',
          },
          {
            language_id: 71,
            stdout: '2\n',
            status_id: 3,
            time: null,
            stderr: null,
            token: '264634dd-e961-4129-9e7f-4c4350f6a66a',
          },
          {
            language_id: 71,
            stdout: '4\n',
            status_id: 4,
            time: null,
            stderr: null,
            token: 'fcf6f4ab-de7d-405e-8166-7f4e1e959e3f',
          },
        ],
      };
      break;
    }
    case 'machi': {
      temp_data = {
        submissions: [
          {
            language_id: 71,
            stdout: '4\n',
            status_id: 4,
            time: '0.068',
            stderr: null,
            token: '156e4908-e544-4cbf-960d-3ee84a5bdd68',
          },
          {
            language_id: 71,
            stdout: '3\n',
            status_id: 4,
            time: null,
            stderr: null,
            token: 'f866857b-1e38-4c06-a150-17c2540fdb48',
          },
          {
            language_id: 71,
            stdout: '10\n',
            status_id: 4,
            time: null,
            stderr: null,
            token: '264634dd-e961-4129-9e7f-4c4350f6a66a',
          },
          {
            language_id: 71,
            stdout: '1\n',
            status_id: 4,
            time: null,
            stderr: null,
            token: 'fcf6f4ab-de7d-405e-8166-7f4e1e959e3f',
          },
        ],
      };
      break;
    }
    default: {
      temp_data = {};
    }
  }
  return temp_data;
}

// send test cases in array and source code in string all should be base64 encoded and language ID
const submitCode = (testCase, code, langId, callback) => {
  // body data
  const bodyData = createBody(testCase, code, langId);

  // do a batch submission with url and submission data
  postData(bodyData)
    // response data is send in data write with then and it contains all tokens
    .then((data) => {
      // parsing all data to get tokens using createUrl
      const getUrl = createUrl(data);
      // time out is set to give time for server to load the answer properly to send response
      setTimeout(() => {
        // getData called to get submission results
        getData(getUrl).then((finalData) => {
          callback(finalData);
        });
      }, 1000);
    });
};

module.exports = { submitCode };
