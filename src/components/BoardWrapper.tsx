"use server";
import { redirect } from "next/navigation";

import boardMock from "@/__mocks__/board.json";
import { Session } from "@/interfaces/types";
import { sleep } from "@/lib/utils/sleep";
import { deleteCookie, getCookie } from "@/lib/actions/cookies";
import { SESSION_COOKIE } from "@/lib/constants";
import { decryptSession } from "@/lib/actions/encrypt";

import { Board } from "./Board";

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

  // TODO: Obtener el tablero desde el backend
  await sleep(5000);
  const board = boardMock;

  return (
    <Board session={session} board={board} />
  );
};

export default BoardWrapper;
