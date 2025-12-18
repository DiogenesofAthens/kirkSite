
import { translateCode } from "./actions/translate";

async function run() {
  const badCode = `
public class RevenueAggregator {
    public Decimal calculateTotal(String accountId) {
        // Vulnerable to SOQL Injection
        String query = 'SELECT Amount FROM Opportunity WHERE AccountId = \\'' + accountId + '\\'';
        List<Opportunity> opps = Database.query(query);
        Decimal total = 0;
        for(Opportunity opp : opps) {
            total += opp.Amount;
        }
        return total;
    }
}
  `;

  console.log("--- Sending Request ---");
  const result = await translateCode(badCode, "Apex", "TypeScript");

  if (result.error) {
      console.log("Error:", result.error);
      if (result.raw_text) {
          console.log("Raw Text Dump:", result.raw_text);
      }
  } else {
      console.log("Success!");
      console.log("Security Warning:", result.data.security_warning);
      console.log("Explanation Start:", result.data.explanation?.substring(0, 50));
      console.log("Code Start:", result.data.translated_code?.substring(0, 50));
  }
}

run();
