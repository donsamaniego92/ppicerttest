const express = require("express");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Initialize Start
const Aweber = require("aweber-api");
const request = require("request");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

const oauth = OAuth({
  consumer: {
    key: `AkRcSuvfwMA4hgkiri34qdp1`,
    secret: `Mw0mq37uc1y42AEDTNID9ST1bDVNmWwWzEmzcEZO`
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto
      .createHmac("sha1", key)
      .update(base_string)
      .digest("base64");
  }
});

const token = {
  key: "AgdsYZk1SNeihDbWv93b2K8W",
  secret: "OzzfQSw60QBZyB7QvQFNmkXNmdCyays4W1io2Hpm"
};

// Initialize End

// GET Request Start

const get_data = {
  url:
    "https://api.aweber.com/1.0/accounts/1111530/lists/5227664/subscribers?sort_order=desc",
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "User-Agent": "AWeber-Python-code-sample/1.0"
  }
};

request(
  {
    url: get_data.url,
    method: get_data.method,
    qs: oauth.authorize(get_data, token),
    json: true
  },
  (error, response, body) => {
    app.get("/api/customers", (req, res) => {
      console.log(data);

      entries = body.entries;

      customers = body;

      res.json(customers);
    });
  }
);

const config = {
  consumerKey: "AkRcSuvfwMA4hgkiri34qdp1",
  consumerSecret: "Mw0mq37uc1y42AEDTNID9ST1bDVNmWwWzEmzcEZO"
};

const session = {
  token: "AgdsYZk1SNeihDbWv93b2K8W",
  tokenSecret: "OzzfQSw60QBZyB7QvQFNmkXNmdCyays4W1io2Hpm"
};

const aw = Aweber(config.consumerKey, config.consumerSecret, {
  token: session.token,
  tokenSecret: session.tokenSecret
});

const data = {
  enforce_custom_field_mapping: true,
  last_followup_message_number_sent: 0,
  list_link: "https://api.aweber.com/1.0/accounts/1111530/lists/5227856",
  "ws.op": "move"
};

const params = {
  "Content-Type": "application/x-www-form-urlencoded",
  Accept: "application/json",
  "User-Agent": "AWeber-Python-code-sample/1.0"
};

aw.post(
  "https://api.aweber.com/1.0/accounts/1111530/lists/5227664/subscribers/",
  { data, params }
).then(response => console.log(response));

const port = 5000;

app.listen(port, () => console.log("Server started on port ${port}"));
