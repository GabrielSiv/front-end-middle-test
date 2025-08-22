const recomendationsStyles = {
  base: 'py-3',
  repeatable: 'border-b-2 ',
};

function RecommendationList({ recommendations }) {
  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Lista de Recomendações:</h2>
      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <ul>
        {recommendations.map((recommendation, index) => {
          const styles = [
            recomendationsStyles.base,
            index < recommendations.length - 1
              ? recomendationsStyles.repeatable
              : '',
          ].join(' ');

          return (
            <li key={index} className={styles}>
              <h3 className="mb-2 font-semibold">{recommendation.name}</h3>
              <ul>
                {recommendation.features.map((feature, idx) => (
                  <li key={idx} className="">
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecommendationList;
