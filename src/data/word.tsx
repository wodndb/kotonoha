 import { prisma } from '@/prisma';
import 'server-only';

 export async function getWords() {
    const words = await prisma.word.findMany({
        orderBy: {
            text: 'asc',
        }
    })
    return words;
 }