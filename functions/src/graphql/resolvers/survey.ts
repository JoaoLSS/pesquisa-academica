interface Args {
    id: number
}

const resolver: Resolver<Args> = (_, where, {dataSourcers: {prisma}}) => {
  return prisma.survey.findFirst({where});
};

export default resolver;
