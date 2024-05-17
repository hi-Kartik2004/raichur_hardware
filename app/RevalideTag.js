"use server";

import { revalidateTag as revalidate } from "next/cache";

async function revalidateTag(name) {
  revalidate(name);
}

export default revalidateTag;
