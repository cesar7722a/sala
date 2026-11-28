const lessons = [
    {
        id: "101",
        courseId: "1",
        title: "Introdução ao Node.js e Event Loop",
        durationMinutes: 45,
        order: 1,
    },
    {
        id: "102",
        courseId: "1",
        title: "Configurando TypeScript e NodeNext",
        durationMinutes: 35,
        order: 2,
    },
    {
        id: "103",
        courseId: "1",
        title: "Streams e Buffers na Prática",
        durationMinutes: 50,
        order: 3,
    },
    {
        id: "201",
        courseId: "2",
        title: "Generics e Utility Types Avançados",
        durationMinutes: 40,
        order: 1,
    },
];
// GET /courses/:courseId/lessons
export function getLessonsByCourse(req, res) {
    const { courseId } = req.params;
    const courseLessons = lessons.filter((l) => l.courseId === courseId);
    return res.status(200).json({
        success: true,
        courseId,
        totalLessons: courseLessons.length,
        data: courseLessons,
    });
}
// GET /courses/:courseId/lessons/:lessonId
export function getLessonById(req, res) {
    const { courseId, lessonId } = req.params;
    const lesson = lessons.find((l) => l.courseId === courseId && l.id === lessonId);
    if (!lesson) {
        return res.status(404).json({
            success: false,
            error: `Aula com ID '${lessonId}' não encontrada para o curso '${courseId}'!`,
        });
    }
    return res.status(200).json({
        success: true,
        data: lesson,
    });
}
