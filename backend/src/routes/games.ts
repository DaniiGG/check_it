import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import {
  createGameSchema,
  updateGameSchema,
  completeGameSchema,
  listGamesSchema,
} from "../lib/validation";
import { ZodError } from "zod";
import { requireAuth } from "../lib/auth";

const router = Router();

// Todas las rutas requieren autenticación
router.use(requireAuth);

function parseTags(tagsJson: string): string[] {
  try {
    return JSON.parse(tagsJson);
  } catch {
    return [];
  }
}

function formatGame(game: any) {
  return { ...game, tags: parseTags(game.tags) };
}

// POST /api/games
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = createGameSchema.parse(req.body);
    const game = await prisma.game.create({
      data: {
        ...data,
        tags: JSON.stringify(data.tags),
        userId: req.user!.userId,
      },
    });
    res.status(201).json(formatGame(game));
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        error: "Validation failed",
        details: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/games/priority
router.get("/priority", async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      where: { completed: false, userId: req.user!.userId },
    });
    const prioritized = games
      .map((g: any) => ({
        ...formatGame(g),
        priority: g.metacriticScore / g.hoursToBeat,
      }))
      .sort((a: any, b: any) => b.priority - a.priority);
    res.json(prioritized);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/games
router.get("/", async (req: Request, res: Response) => {
  try {
    const query = listGamesSchema.parse(req.query);
    const where: any = { userId: req.user!.userId };

    if (query.completed !== undefined) {
      where.completed = query.completed;
    }
    if (query.category) {
      where.category = { contains: query.category };
    }
    if (query.search) {
      where.name = { contains: query.search };
    }

    let orderBy: any = { createdAt: "desc" };
    if (query.sort === "score") {
      orderBy = { metacriticScore: "desc" };
    } else if (query.sort === "completed") {
      orderBy = { completedAt: { sort: "desc", nulls: "last" } };
    } else if (query.sort === "in_progress") {
      orderBy = { completed: "asc" };
    }

    const games = await prisma.game.findMany({ where, orderBy });
    let formatted = games.map(formatGame);

    if (query.tag) {
      formatted = formatted.filter((g) =>
        g.tags.some(
          (t: string) => t.toLowerCase() === query.tag!.toLowerCase()
        )
      );
    }

    if (query.sort === "priority") {
      formatted = formatted
        .map((g: any) => ({
          ...g,
          priority: g.metacriticScore / g.hoursToBeat,
        }))
        .sort((a: any, b: any) => b.priority - a.priority);
    }

    res.json(formatted);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        error: "Invalid query parameters",
        details: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/games/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const game = await prisma.game.findFirst({
      where: { id, userId: req.user!.userId },
    });
    if (!game) {
      res.status(404).json({ error: "Game not found" });
      return;
    }
    res.json(formatGame(game));
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/games/:id
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = updateGameSchema.parse(req.body);
    const updateData: any = { ...data };
    if (data.tags) {
      updateData.tags = JSON.stringify(data.tags);
    }

    const result = await prisma.game.updateMany({
      where: { id, userId: req.user!.userId },
      data: updateData,
    });
    if (result.count === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    const updated = await prisma.game.findUnique({ where: { id } });
    res.json(formatGame(updated));
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        error: "Validation failed",
        details: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/games/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await prisma.game.deleteMany({
      where: { id, userId: req.user!.userId },
    });
    if (result.count === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/games/:id/complete
router.post("/:id/complete", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = completeGameSchema.parse(req.body);
    const updateData: any = {
      completed: true,
      completedAt: new Date(),
    };
    if (data.rating !== undefined) updateData.rating = data.rating;
    if (data.completionNotes !== undefined)
      updateData.completionNotes = data.completionNotes;

    const result = await prisma.game.updateMany({
      where: { id, userId: req.user!.userId },
      data: updateData,
    });
    if (result.count === 0) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    const updated = await prisma.game.findUnique({ where: { id } });
    res.json(formatGame(updated));
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        error: "Validation failed",
        details: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;