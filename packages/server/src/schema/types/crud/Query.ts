import { enumType, queryType } from 'nexus'
import { Context } from '../../../context'
import { getUserId } from '../../../utils/getUserId'

export default queryType({
  definition(t) {
    t.field('currentUser', {
      type: 'User',
      async resolve(source, args, context: Context) {
        const userId = await getUserId(context)

        if (!userId) {
          return null
        }

        const user = await context.prisma.user.findUnique({
          where: { id: userId },
        })

        return user
      },
    })

    t.crud.user()
    t.crud.users({
      ordering: true,
    })

    t.crud.photo()
    t.crud.photos()

    t.crud.album()
    t.crud.albums({
      filtering: true,
      ordering: true,
    })

    t.crud.comment()
    t.crud.comments({
      ordering: true,
    })
  },
})

export const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})
