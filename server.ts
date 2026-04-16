const { Medusa } = require("@medusajs/medusa");
const port = process.env.PORT || 9000;

Medusa({}).then((app: any) => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server ready on port ${port}`);
  });
});
