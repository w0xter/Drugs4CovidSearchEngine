const queries = [
     {title:'What ATC codes are mentioned in each article?', sparql:'select distinct ?paper, ?mention where {\n?paper a <https://w3id.org/def/DRUGS4COVID19#Paper>.\n?paper <https://w3id.org/def/DRUGS4COVID19/menciona> ?mention .\n} limit 10\n', graphql_ld_:''}
]
export default queries