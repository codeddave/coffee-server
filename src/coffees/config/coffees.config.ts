import { registerAs } from "@nestjs/config"

//rigisterAs fn helps to register a namespaced config object under the key passed as first arg.
export default registerAs("coffees", () => ({
  foo: "bar",
}))
