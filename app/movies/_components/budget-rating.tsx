import { getBudgetVsRatingData } from "../_actions";
import BudgetRatingClient from "./budget-rating-client";

export type BudgetRatingDataType = Awaited<
  ReturnType<typeof getBudgetVsRatingData>
>;

const BudgetRating = async () => {
  const budgetRating = await getBudgetVsRatingData();

  return (
    <div>
      <p className="description">
        This visualization explores the relationship between movie profits and
        IMDb ratings across different years. By analyzing how profitability
        correlates with audience reception, we can identify trends in
        high-budget blockbusters versus critically acclaimed lower-budget films.
        This graph provides insight into whether financial success aligns with
        audience ratings over time.
      </p>
      <BudgetRatingClient data={budgetRating} />
    </div>
  );
};

export default BudgetRating;
