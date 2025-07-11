"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Heart, Users, Plus, Sparkles } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Livro {
  id: number
  titulo: string
  autora: string
  categoria: string
}

export default function Component() {
  const [livros, setLivros] = useState<Livro[]>([])
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos")
  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    autora: "",
    categoria: "",
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [loading, setLoading] = useState(true)

  const API_BASE = "http://localhost:3001"

  useEffect(() => {
    carregarLivros()
  }, [filtroCategoria])

  const carregarLivros = async () => {
    try {
      setLoading(true)
      let url = `${API_BASE}/livros/todos`

      if (filtroCategoria === "mulheres") {
        url = `${API_BASE}/livros/mulheres`
      } else if (filtroCategoria === "antirracismo") {
        url = `${API_BASE}/livros/antirracismo`
      }

      const response = await fetch(url)
      const data = await response.json()
      setLivros(data)
    } catch (error) {
      console.error("Erro ao carregar livros:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os livros. Verifique se a API está rodando.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const adicionarLivro = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!novoLivro.titulo || !novoLivro.autora || !novoLivro.categoria) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`${API_BASE}/livros/novo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLivro),
      })

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Livro adicionado com sucesso!",
        })
        setNovoLivro({ titulo: "", autora: "", categoria: "" })
        setMostrarFormulario(false)
        carregarLivros()
      } else {
        throw new Error("Erro ao adicionar livro")
      }
    } catch (error) {
      console.error("Erro ao adicionar livro:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o livro.",
        variant: "destructive",
      })
    }
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "mulheres":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      case "antirracismo":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "todos":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "mulheres":
        return <Heart className="w-4 h-4" />
      case "antirracismo":
        return <Users className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10" />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Mulheres que Inspiram
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Valorize, celebre e dê visibilidade às histórias de mulheres que marcaram a história com sua coragem,
            inteligência, sensibilidade e resistência
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Histórias Inspiradoras</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>Empoderamento</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Representatividade</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros e Ações */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Label htmlFor="categoria" className="text-lg font-semibold">
                Filtrar por categoria:
              </Label>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os livros</SelectItem>
                  <SelectItem value="mulheres">Mulheres Inspiradoras</SelectItem>
                  <SelectItem value="antirracismo">Antirracismo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Livro
            </Button>
          </div>

          {/* Formulário para adicionar livro */}
          {mostrarFormulario && (
            <Card className="mb-8 border-2 border-pink-200 dark:border-pink-800">
              <CardHeader>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Adicionar Novo Livro
                </CardTitle>
                <CardDescription className="text-center">
                  Compartilhe uma história inspiradora de uma mulher que marcou sua vida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={adicionarLivro} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="titulo">Título do Livro</Label>
                      <Input
                        id="titulo"
                        value={novoLivro.titulo}
                        onChange={(e) => setNovoLivro({ ...novoLivro, titulo: e.target.value })}
                        placeholder="Digite o título do livro"
                      />
                    </div>
                    <div>
                      <Label htmlFor="autora">Autora</Label>
                      <Input
                        id="autora"
                        value={novoLivro.autora}
                        onChange={(e) => setNovoLivro({ ...novoLivro, autora: e.target.value })}
                        placeholder="Nome da autora"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="categoria-nova">Categoria</Label>
                    <Select
                      value={novoLivro.categoria}
                      onValueChange={(value) => setNovoLivro({ ...novoLivro, categoria: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mulheres">Mulheres Inspiradoras</SelectItem>
                        <SelectItem value="antirracismo">Antirracismo</SelectItem>
                        <SelectItem value="todos">Geral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      Adicionar Livro
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setMostrarFormulario(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Lista de Livros */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {filtroCategoria === "todos"
              ? "Todos os Livros"
              : filtroCategoria === "mulheres"
                ? "Mulheres Inspiradoras"
                : "Antirracismo"}
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Carregando livros...</p>
            </div>
          ) : livros.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-400">Nenhum livro encontrado nesta categoria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {livros.map((livro) => (
                <Card
                  key={livro.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-pink-200 dark:hover:border-pink-800"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={`${getCategoriaColor(livro.categoria)} flex items-center gap-1`}>
                        {getCategoriaIcon(livro.categoria)}
                        {livro.categoria === "mulheres"
                          ? "Mulheres"
                          : livro.categoria === "antirracismo"
                            ? "Antirracismo"
                            : "Geral"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight text-gray-800 dark:text-gray-200">
                      {livro.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium text-pink-600 dark:text-pink-400 mb-2">{livro.autora}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <BookOpen className="w-4 h-4" />
                      <span>História inspiradora</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-800 dark:to-purple-900 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Mulheres que Inspiram
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Celebrando as histórias de coragem, inteligência e resistência que transformam o mundo
          </p>
          <div className="flex justify-center items-center gap-2 text-gray-600 dark:text-gray-400">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>Feito com amor para inspirar gerações</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
