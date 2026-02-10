# Personal Finance and Bill Splitting Assistant

A modern web application designed to help users manage personal finances, split bills with friends and roommates, track expenses, and maintain a comprehensive overview of their financial health.

## 🌟 Features

- **Bill Management**: Create and manage individual and group bills with ease
- **Expense Tracking**: Monitor all expenses and categorize spending patterns
- **Debt Management**: Keep track of debts and payment status
- **Bill Splitting**: Automatically calculate and split costs among group members
- **Financial Reports**: Generate detailed expense reports with charts and insights
- **Budget Planning**: Set and track budgets for different categories
- **AI-Powered Chat**: Get financial advice from an AI assistant
- **Reminders**: Set payment reminders to never miss a due date
- **User Profiles**: Manage personal information and preferences
- **Currency Support**: Multi-currency support for global users
- **Authentication**: Secure login and password management

## 🛠 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) 16.1.1 - React framework
- [React](https://react.dev/) 19.2.3 - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Material-UI (MUI)](https://mui.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

### Forms & Validation
- [React Hook Form](https://react-hook-form.com/) - Form management
- [Zod](https://zod.dev/) - Schema validation
- [React Hook Form Resolvers](https://github.com/react-hook-form/resolvers) - Form validation

### State & Data Management
- [React Query (TanStack Query)](https://tanstack.com/query/latest) - Server state management
- [React Context API](https://react.dev/reference/react/useContext) - Client state management
- [Emotion](https://emotion.sh/) - CSS-in-JS styling

### Data Visualization
- [ApexCharts](https://apexcharts.com/) - Advanced charts and graphs
- [Chart.js](https://www.chartjs.org/) - Interactive data visualization
- [MUI X Charts](https://mui.com/x/api/charts/) - Material Design charts
- [D3.js](https://d3js.org/) - Data-driven document visualization

### Icons & UI
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [FontAwesome](https://fontawesome.com/) - Font-based icons
- [Tabler Icons](https://tabler-icons.io/) - Custom icon set
- [Lucide React](https://lucide.dev/) - Modern SVG icons

### Development Tools
- [ESLint](https://eslint.org/) - Code linting
- [PostCSS](https://postcss.org/) - CSS transformation
- [TypeScript](https://www.typescriptlang.org/) - Type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v18 or higher
- **npm**, **yarn**, **pnpm**, or **bun** as your package manager

## 🚀 Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Seraj-Omar/Personal-Finance-and-Bill-Splitting-Assistant.git
   cd Personal-Finance-and-Bill-Splitting-Assistant
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   Or using other package managers:
   ```bash
   pnpm install
   yarn install
   bun install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will auto-update as you edit files, thanks to Next.js's hot reload feature.

### Building for Production

Create an optimized production build:

```bash
npm run build
npm start
```

The built application will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/                           # Next.js app directory
│   ├── (home)/                   # Home page
│   ├── (main)/                   # Main authenticated routes
│   │   ├── report/              # Financial reports
│   │   ├── services/            # Services page
│   │   └── settings/            # User settings
│   ├── api/                      # API routes and server endpoints
│   │   └── auth/                # Authentication endpoints
│   ├── about-us/                # About page
│   ├── auth/                    # Authentication pages
│   ├── budget/                  # Budget management
│   ├── bills/                   # Bills management
│   ├── chat/                    # AI chat interface
│   ├── currency/                # Currency conversion
│   ├── debts/                   # Debt tracking
│   ├── reminders/               # Payment reminders
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── forgot-password/         # Password recovery
│   ├── reset-password/          # Password reset
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── theme.ts                 # Theme configuration
│   └── providers.tsx            # App providers wrapper
│
├── components/                   # Reusable React components
│   ├── bills/                   # Bill-related components
│   │   ├── AddGroupClient.tsx   # Group bill form
│   │   ├── AddIndividualClient.tsx # Individual bill form
│   │   ├── BillsClient.tsx      # Bills list view
│   │   └── ui/                  # Bill UI components
│   ├── debts/                   # Debt management components
│   │   ├── Card.tsx             # Debt card display
│   │   ├── DebtsView.tsx        # Debts list view
│   │   ├── FilterBar.tsx        # Filtering controls
│   │   ├── PaymentTable.tsx     # Payment details table
│   │   └── FinancialOverview.tsx # Overview dashboard
│   ├── profile/                 # User profile components
│   │   ├── AvatarSection.tsx    # User avatar
│   │   ├── PersonalInfoForm.tsx # Personal info editor
│   │   ├── PasswordForm.tsx     # Password change form
│   │   └── ...
│   ├── home/                    # Home page components
│   │   ├── Home.tsx             # Main home section
│   │   ├── HomeHero.tsx         # Hero banner
│   │   ├── OurServices.tsx      # Services showcase
│   │   ├── AskAi.tsx            # AI assistant preview
│   │   └── ...
│   ├── reportComponents/        # Report visualization
│   │   ├── billschart.tsx       # Bills chart
│   │   ├── expenseReport.tsx    # Expense report
│   │   ├── ExpenseBubbelChart.tsx # Bubble chart
│   │   └── Insights.tsx         # Financial insights
│   └── ...
│
├── modules/                      # Feature modules (logic & hooks)
│   ├── askAIChat/               # AI chat feature
│   │   ├── AskAIChat.tsx        # Main chat component
│   │   ├── ChatBubble.tsx       # Chat message bubble
│   │   ├── ChatInput.tsx        # Input area
│   │   ├── api/                 # Chat API calls
│   │   ├── hooks/               # Custom hooks
│   │   ├── type/                # Type definitions
│   │   └── constants.ts         # Constants
│   ├── auth/                    # Authentication module
│   │   ├── type.ts              # Auth types
│   │   ├── schema/              # Validation schemas
│   │   ├── hooks/               # Auth hooks
│   │   ├── components/          # Auth components
│   │   └── pages/               # Auth pages
│   ├── budget/                  # Budget management
│   ├── expenses/                # Expense tracking
│   └── reminder/                # Reminder system
│
├── context/                      # React Context
│   └── AuthContext.tsx          # Authentication context
│
├── lib/                         # Utilities & helpers
│   └── api.ts                   # API client setup
│
├── types/                       # TypeScript definitions
│   └── t1.tsx                   # Type definitions
│
└── shared/                      # Shared code
    └── ui/                      # Shared UI components
```

## 🔑 Key Features in Detail

### Bills & Splitting
- Create individual or group bills
- Automatically calculate fair splits among participants
- Track payment status for each person
- Support for multiple currencies

### Expense Management
- Log and categorize expenses
- Visual expense reports with multiple chart types
- Monthly and yearly analytics
- Spending trends and pattern analysis

### Debt Tracking
- Keep tabs on all debts
- Monitor payment status
- Payment history and settlements
- Debt statistics and summaries

### Financial Dashboard
- Comprehensive financial overview
- Key metrics and KPIs
- Quick access to all features
- Personalized insights

### AI Financial Assistant
- Chat interface for financial questions
- AI-powered recommendations
- Smart financial suggestions
- Context-aware assistance

### Budget Planning
- Set budget goals by category
- Track spending against budgets
- Budget performance analytics
- Alert system for overspending

### Reminders & Notifications
- Payment due date reminders
- Customizable alert times
- Email and app notifications
- Payment history tracking

## 📝 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint to check code quality
npm run lint
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository** on GitHub
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-amazing-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-amazing-feature
   ```
5. **Open a Pull Request** describing your changes

### Coding Standards
- Use TypeScript for type safety
- Follow the existing code style
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes before submitting

## � Team Members

| Name | Role | GitHub | LinkedIn |
|------|------|--------|----------|
| Seraj Omar | Lead Developer | [@Seraj-Omar](https://github.com/Seraj-Omar) | - |
| Noor Al Afifi | Developer | [@noorafifi889](https://github.com/noorafifi889) | - |
| Anas | Developer | - | - |
| Asma | Developer | - | - |
| Nour Anour | Developer | - | - |
| Seema | Developer | - | - |

*Add team members information above*

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Tips for Getting Started

1. **Explore the app**: Navigate through different sections to understand the UI
2. **Check the auth**: Review authentication flow in `src/modules/auth/`
3. **Study components**: Look at existing components to understand patterns
4. **Read types**: TypeScript definitions will help you understand data structures
5. **API calls**: Check `src/lib/api.ts` for API integration patterns

## 📞 Support & Feedback

- **Found a bug?** Open an [issue](https://github.com/Seraj-Omar/Personal-Finance-and-Bill-Splitting-Assistant/issues)
- **Have a suggestion?** Create a [feature request](https://github.com/Seraj-Omar/Personal-Finance-and-Bill-Splitting-Assistant/issues)
- **Need help?** Check existing issues or create a new one

## 🙏 Acknowledgments

This project leverages some amazing open-source technologies:

- **Framework**: [Next.js](https://nextjs.org/) - The React framework for production
- **UI Library**: [Material-UI (MUI)](https://mui.com/) - Comprehensive React UI components
- **Form Management**: [React Hook Form](https://react-hook-form.com/) - Performant forms
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/) - Data synchronization
- **Charts & Graphs**: [ApexCharts](https://apexcharts.com/) & [Chart.js](https://www.chartjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: Multiple icon libraries for beautiful UI

## 📈 Project Stats

- **Framework**: Next.js 16.1.1
- **React Version**: 19.2.3
- **Node.js**: v18+
- **Package Manager**: npm, pnpm, yarn, or bun

---

**Made with ❤️ for better financial management**

**Happy budgeting! 💰**
