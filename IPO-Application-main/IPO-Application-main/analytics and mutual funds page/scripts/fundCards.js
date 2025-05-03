// Fund Data Management
class FundManager {
  constructor(fundsData) {
    this.fundsData = fundsData;
  }

  createFundCard(fund) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = this._generateFundCardHTML(fund);

    const expandBtn = card.querySelector('.expand-btn');
    expandBtn.addEventListener('click', () => this._toggleCardExpansion(card));

    return card;
  }

  _generateFundCardHTML(fund) {
    return `
        <div class="card-header">
          <div class="card-header-left">
            <div class="logo"></div>
            <div class="card-title">${fund.name}</div>
          </div>
          <button class="expand-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </button>
        </div>
        <div class="card-content">
          ${this._generateStatsHTML(fund)}
          ${this._generateSectionsHTML(fund)}
        </div>
      `;
  }

  _generateStatsHTML(fund) {
    return `
        <div class="stats">
          <div class="stat-item">
            <div class="stat-label">AUM</div>
            <div class="stat-value">${fund.aum}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Expense Ratio</div>
            <div class="stat-value">${fund.expense_ratio}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">5Y CAGR</div>
            <div class="stat-value green">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
              ${fund.five_year_cagr}
            </div>
          </div>
        </div>
      `;
  }

  _generateSectionsHTML(fund) {
    const sections = [
      {
        icon: { color: 'blue', path: 'M12 20v-6M6 20V10M18 20V4' },
        title: 'Performance',
        description: `The fund's annualised performance has been ${fund.performance.annualized_since_inception} since inception.`,
      },
      {
        icon: {
          color: 'red',
          path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
        },
        title: 'Risk',
        description: `The fund has been categorised as ${fund.risk.sebi_category} by SEBI and has a standard deviation of ${fund.risk.standard_deviation} vs its category average of ${fund.risk.category_average_std_dev}.`,
      },
      {
        icon: { color: 'purple', path: 'M3 3h18v18H3z' },
        title: 'Composition',
        description: `Large Cap makes up for the majority of the fund at ${fund.composition.large_cap_percentage}% along with the largest allocation towards ${fund.composition.largest_sector_allocation.sector} at ${fund.composition.largest_sector_allocation.percentage}%.`,
      },
    ];

    return sections
      .map(
        (section) => `
          <div class="section">
            <div class="section-icon" style="color: ${section.icon.color};">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="${section.icon.path}"/>
              </svg>
            </div>
            <div class="section-content">
              <h3>${section.title}</h3>
              <p>${section.description}</p>
            </div>
          </div>
        `
      )
      .join('');
  }

  _toggleCardExpansion(card) {
    card.classList.toggle('expanded');
  }

  renderFunds(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    this.fundsData.large_cap_funds.forEach((fund) => {
      const fundCard = this.createFundCard(fund);
      container.appendChild(fundCard);
    });
  }
}

// Initialize Fund Rendering when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, checking fundsData');
  if (window.fundsData) {
    console.log('Funds data found, rendering cards');
    const fundManager = new FundManager(window.fundsData);
    fundManager.renderFunds('fundsContainer');
  } else {
    console.error('Funds data not loaded');
  }
});
