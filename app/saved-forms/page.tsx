"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Download } from "lucide-react";
import Header from "@/components/Header";
import { indexedDBManager, CarFormData } from "@/lib/indexedDB";

export default function SavedFormsPage() {
  const [savedForms, setSavedForms] = useState<CarFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<CarFormData | null>(null);

  useEffect(() => {
    loadSavedForms();
  }, []);

  const loadSavedForms = async () => {
    try {
      setLoading(true);
      const forms = await indexedDBManager.getAllCarForms();
      setSavedForms(forms);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load saved forms"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (id: number) => {
    if (!confirm("Are you sure you want to delete this form?")) {
      return;
    }

    try {
      await indexedDBManager.deleteCarForm(id);
      setSavedForms((prev) => prev.filter((form) => form.id !== id));
      if (selectedForm?.id === id) {
        setSelectedForm(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete form");
    }
  };

  const clearAllForms = async () => {
    if (
      !confirm(
        "Are you sure you want to delete ALL saved forms? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await indexedDBManager.clearAllCarForms();
      setSavedForms([]);
      setSelectedForm(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to clear all forms"
      );
    }
  };

  const exportFormData = (form: CarFormData) => {
    const dataStr = JSON.stringify(form, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `car-form-${form.id}-${
      new Date(form.createdAt).toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getMakeName = (makeId: number) => {
    // This would typically come from your API or a lookup table
    // For now, we'll just return the ID
    return `Make ID: ${makeId}`;
  };

  const getModelName = (modelId: number) => {
    // This would typically come from your API or a lookup table
    // For now, we'll just return the ID
    return `Model ID: ${modelId}`;
  };

  if (loading) {
    return (
      <div>
        <Header color="black" />
        <div className="grid my-auto place-items-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading saved forms...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header color="black" />
      <div className="grid my-auto place-items-center pt-20">
        <div className="w-full max-w-6xl bg-transparent rounded-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-black/70 uppercase">
              Saved Car Forms
            </h1>
            {savedForms.length > 0 && (
              <Button
                onClick={clearAllForms}
                variant="destructive"
                className="px-4 py-2"
              >
                Clear All
              </Button>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {savedForms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No saved forms found.</p>
              <p className="text-gray-500 text-sm mt-2">
                Submit a car form to see it saved here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Forms List */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Saved Forms ({savedForms.length})
                </h2>
                {savedForms.map((form) => (
                  <Card
                    key={form.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedForm?.id === form.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedForm(form)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {getMakeName(form.make)} - {getModelName(form.model)}
                        </CardTitle>
                        <Badge variant="secondary">ID: {form.id}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>Year:</strong> {form.year}
                        </p>
                        <p>
                          <strong>Mileage:</strong> {form.mileage} km
                        </p>
                        <p>
                          <strong>Price:</strong> ${form.price}
                        </p>
                        <p>
                          <strong>Created:</strong>{" "}
                          {new Date(form.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Images:</strong> {form.images.length} file(s)
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedForm(form);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            exportFormData(form);
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteForm(form.id!);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Form Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Form Details
                </h2>
                {selectedForm ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {getMakeName(selectedForm.make)} -{" "}
                        {getModelName(selectedForm.model)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Year:</strong> {selectedForm.year}
                        </div>
                        <div>
                          <strong>Mileage:</strong> {selectedForm.mileage} km
                        </div>
                        <div>
                          <strong>Engine:</strong> {selectedForm.engine}
                        </div>
                        <div>
                          <strong>Gearbox:</strong> {selectedForm.gearbox}
                        </div>
                        <div>
                          <strong>Exterior Color:</strong>{" "}
                          {selectedForm.bodyColor}
                        </div>
                        <div>
                          <strong>Interior Color:</strong>{" "}
                          {selectedForm.interiorColor}
                        </div>
                        <div>
                          <strong>Fuel Type:</strong> {selectedForm.fuelType}
                        </div>
                        <div>
                          <strong>Price:</strong> ${selectedForm.price}
                        </div>
                        <div>
                          <strong>Sales Type:</strong> {selectedForm.salesType}
                        </div>
                        <div>
                          <strong>Images:</strong> {selectedForm.images.length}{" "}
                          file(s)
                        </div>
                      </div>

                      <div>
                        <strong>Description:</strong>
                        <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {selectedForm.description}
                        </p>
                      </div>

                      <div>
                        <strong>Created:</strong>{" "}
                        {new Date(selectedForm.createdAt).toLocaleString()}
                      </div>
                      <div>
                        <strong>Last Updated:</strong>{" "}
                        {new Date(selectedForm.updatedAt).toLocaleString()}
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={() => exportFormData(selectedForm)}
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export JSON
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => deleteForm(selectedForm.id!)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <p className="text-gray-600">
                        Select a form to view details
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
