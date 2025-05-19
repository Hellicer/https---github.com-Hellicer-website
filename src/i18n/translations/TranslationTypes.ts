export interface TranslationTypes {
    language: {
        en: string
        uk: string
    }
    header: {
        specialization: string
        skills: string
        about: string
        projects: string
        // advantages: string
        // howItWork: string
        // cases: string
        // partners: string
        contact: string
    }
    headerTitle: {
        title: string
        description: {
            first: string
            second: string
            third: string
        }
    }
    subHeaderTitle: {
        aboutUs: string
        project: string
        services: string
        learnMore: string
    }
    sideSwitcherLeft: string
    sideSwitcherRight: string
    specialization: {
        title: string

        cards: {
            corporateWebsites: {
                title: string
                description: string
            }
            crm: {
                title: string
                description: string
            }
            personalPortfolios: {
                title: string
                description: string
            }
            webApplications: {
                title: string
                description: string
            }
            marketplaces: {
                title: string
                description: string
            }
            chatbotsAndAutomation: {
                title: string
                description: string
            }
            paymentSystemIntegration: {
                title: string
                description: string
            }
            migrationAndOptimization: {
                title: string
                description: string
            }
        }
    }
    about: {
        title: string
        solvingBlock: {
            title: string
            experience: string
            projectsCompleted: string
            roas: string
            ssr: string
            metadata: string
        }
        cd: {
            mainInfo: {
                title: string // "Main Info" або "Основна інформація"
                name: string // "Name"
                position: string // "Position"
                sex: string // "Sex"
                age: string // "Age"
                sexValues: {
                    male: string // "Male" → "Чоловік"
                    female: string // "Female" → "Жінка"
                    other: string // "Other" → "Інше"
                }
            }
            skills: {
                title: string // "Skills"
                template: string
                // Наприклад:
                // "Experience in {{frontend}} and {{backend}}. Database knowledge: {{databases}}."
            }
            techStack: {
                title: string // "Tech Stack"
            }
            otherInfo: {
                title: string // "Other Info"
            }
            projects: {
                title: string // "Projects"
                openSource: string // "Open-source"
                startups: string // "Startups"
                freelance: string // "Freelance"
                corporate: string // "Corporate"
            }
        }
    }
    project: {}

    contact: {
        title: string
        description: string
    }
}
