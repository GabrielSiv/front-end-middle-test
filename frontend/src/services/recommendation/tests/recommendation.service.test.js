import getRecommendations from '..';
import mockProducts from '../../../mocks/mockProducts';
import { mockOptions } from '../../../mocks/mockProps';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station CRM');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna uma quantidade de opções igual a 3', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
        'Gestão de conversas em diferentes canais',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = getRecommendations(
      formData,
      mockProducts,
      mockOptions
    );

    expect(recommendations).toHaveLength(3);
  });

  test('Retorna lista vazia quando não há preferências nem features selecionadas', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toEqual([]);
  });

  test('Retorna vazio quando nenhum produto atinge o score mínimo', () => {
    const formData = {
      selectedPreferences: ['Palavra inexistente'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toEqual([]);
  });

  test('Respeita o maxResults definido nas opções', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const customOptions = { ...mockOptions, maxResults: 2 };

    const recommendations = getRecommendations(
      formData,
      mockProducts,
      customOptions
    );

    expect(recommendations).toHaveLength(2);
  });

  test('Desempata pelo índice em MultipleProducts quando scores são iguais', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations.map((r) => r.id)).toEqual([2, 1]);
  });
});
