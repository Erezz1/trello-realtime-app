"use server";
import { redirect } from "next/navigation";

import { Session } from "@/interfaces/types";
import { deleteCookie, getCookie } from "@/lib/actions/cookies";
import { SESSION_COOKIE } from "@/lib/constants";
import { decryptSession } from "@/lib/actions/encrypt";

import { Board } from "./Board";
import { getBoard } from "@/services/board";
import { orderBoard } from "@/helpers/orderBoard";

const BoardWrapper = async () => {
  const encryptedSession = await getCookie(SESSION_COOKIE);
  if (!encryptedSession)
    return redirect("/login");

  const decrtyptedSession = await decryptSession(encryptedSession);
  if (!decrtyptedSession) {
    await deleteCookie(SESSION_COOKIE);
    return redirect("/login");
  }

  const session = JSON.parse(decrtyptedSession) as Session;
  if (!session.token || !session.email) {
    await deleteCookie(SESSION_COOKIE);
    return redirect("/login");
  }

  const board = await getBoard(session.email);
  const orderedBoard = orderBoard(board);

  return (
    <Board session={session} board={orderedBoard} />
  );
};

export default BoardWrapper;
