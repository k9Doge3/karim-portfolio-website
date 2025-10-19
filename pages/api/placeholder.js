// Placeholder image (1x1 transparent PNG)
const placeholder = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9pQn1wAAAABJRU5ErkJggg==",
  "base64"
);

export default function handler(req, res) {
  res.setHeader("Content-Type", "image/png");
  res.send(placeholder);
}
