let config = null;

export default () => {
    if (!config) {
        config = {
            variables: {
                category_ticket_field: process.env.CATEGORY_TICKET_FIELD
            }
        };        
    }

    return config;
};