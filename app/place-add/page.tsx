"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Plus, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useMakes, useModels } from "@/hooks/cars";
import Header from "@/components/Header";
import { indexedDBManager, convertFormDataToCarForm } from "@/lib/indexedDB";
import Link from "next/link";
import type { Feature } from "../types/Car";
import { Checkbox } from "@/components/ui/checkbox";

// Validation schema
const formSchema = z.object({
  make: z.number().refine((val) => val > 0, "Please select a make"),
  model: z.number().refine((val) => val > 0, "Please select a model"),
  year: z.string().min(1, "Please select a year"),
  mileage: z
    .string()
    .min(1, "Mileage is required")
    .regex(/^\d+$/, "Please enter a valid mileage"),
  engine: z.string().min(1, "Engine type is required"),
  gearbox: z.string().min(1, "Gearbox type is required"),
  bodyColor: z.string().min(1, "Exterior color is required"),
  interiorColor: z.string().min(1, "Interior color is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+$/, "Please enter a valid price"),
  salesType: z.string().min(1, "Sales type is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function PlaceAddForm() {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      make: 0,
      model: 0,
      year: "",
      mileage: "",
      engine: "",
      gearbox: "",
      bodyColor: "",
      interiorColor: "",
      fuelType: "",
      price: "",
      salesType: "",
      description: "",
      images: [],
    },
  });

  const watchedMake = watch("make");
  const { data: makes, isLoading: isMakesLoading } = useMakes();
  const { data: models, isLoading: isModelsLoading } = useModels(
    watchedMake > 0 ? watchedMake : undefined
  );

  // Generate years from 1921 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1920 },
    (_, i) => currentYear - i
  );

  const fuelTypes = [
    "Petrol",
    "Diesel",
    "Electric",
    "Hybrid",
    "Plug-in Hybrid",
    "CNG",
    "LPG",
    "Hydrogen",
  ];
  const engineTypes = [
    "Inline-3",
    "Inline-4",
    "Inline-6",
    "V6",
    "V8",
    "V10",
    "V12",
    "Boxer (Flat)",
    "Rotary (Wankel)",
    "Turbocharged",
    "Supercharged",
    "Naturally Aspirated",
  ];
  const gearboxTypes = ["Manual", "Automatic", "CVT", "Semi-Automatic"];
  const salesTypes = ["Auction", "Fixed Price"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = [...images, ...Array.from(e.target.files)];
      setImages(newImages);
      setValue("images", newImages);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue("images", newImages);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Create FormData for API submission (if needed)
      const formDataToSubmit = new FormData();

      // Add all form fields to FormData
      formDataToSubmit.append("make", data.make.toString());
      formDataToSubmit.append("model", data.model.toString());
      formDataToSubmit.append("year", data.year);
      formDataToSubmit.append("mileage", data.mileage);
      formDataToSubmit.append("engine", data.engine);
      formDataToSubmit.append("gearbox", data.gearbox);
      formDataToSubmit.append("bodyColor", data.bodyColor);
      formDataToSubmit.append("interiorColor", data.interiorColor);
      formDataToSubmit.append("fuelType", data.fuelType);
      formDataToSubmit.append("price", data.price);
      formDataToSubmit.append("salesType", data.salesType);
      formDataToSubmit.append("description", data.description);

      // Add images to FormData
      data.images.forEach((image, index) => {
        formDataToSubmit.append(`images`, image);
      });

      // Store in IndexedDB
      const carFormData = convertFormDataToCarForm(
        formDataToSubmit,
        data.images
      );
      const savedId = await indexedDBManager.saveCarForm(carFormData);

      // console.log("Form data saved to IndexedDB with ID:", savedId);
      // console.log("Form submitted with data:", formDataToSubmit);

      setSubmitSuccess(true);

      // Here you would typically send the formDataToSubmit to your API
      // await submitToAPI(formDataToSubmit);
    } catch (error) {
      console.error("Error saving form data:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to save form data"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const fieldsToValidate =
      step === 1
        ? [
            "make",
            "model",
            "year",
            "mileage",
            "engine",
            "gearbox",
            "bodyColor",
            "interiorColor",
          ]
        : ["fuelType", "price", "salesType", "description", "images"];

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setStep(2);
    }
  };

  const [showAllTechnical, setShowAllTechnical] = useState(false);
  const [showAllExtras, setShowAllExtras] = useState(false);

  const [technicalFeatures, setTechnicalFeatures] = useState<Feature[]>([
    { id: "tiptronic", label: "Tiptronic Gears", checked: false },
    { id: "front-airbags", label: "Front Airbags", checked: false },
    { id: "dual-exhaust", label: "Dual Exhaust", checked: false },
    { id: "side-airbags", label: "Side Airbags", checked: false },
    { id: "power-steering", label: "Power Steering", checked: false },
    { id: "n2o-system", label: "N2O System", checked: false },
    { id: "cruise-control", label: "Cruise Control", checked: false },
    { id: "front-wheel-drive", label: "Front Wheel Drive", checked: false },
    { id: "rear-wheel-drive", label: "Rear Wheel Drive", checked: false },
    { id: "4-wheel-drive", label: "4 Wheel Drive", checked: false },
    { id: "all-wheel-steering", label: "All Wheel Steering", checked: false },
    { id: "anti-lock-brakes", label: "Anti-Lock Brakes/ABS", checked: false },
    { id: "all-wheel-drive", label: "All Wheel Drive", checked: false },
  ]);

  const [extras, setExtras] = useState<Feature[]>([
    { id: "bluetooth-system", label: "Bluetooth System", checked: false },
    { id: "heated-seats", label: "Heated Seats", checked: false },
    { id: "cd-player", label: "CD Player", checked: false },
    { id: "power-locks", label: "Power Locks", checked: false },
    { id: "premium-wheels", label: "Premium Wheels/Rims", checked: false },
    { id: "winch", label: "Winch", checked: false },
    { id: "alarm", label: "Alarm/Anti-Theft System", checked: false },
    { id: "cooled-seats", label: "Cooled Seats", checked: false },
    { id: "keyless-start", label: "Keyless Start", checked: false },
    { id: "body-kit", label: "Body Kit", checked: false },
    { id: "navigation", label: "Navigation System", checked: false },
    { id: "premium-lights", label: "Premium Lights", checked: false },
    { id: "cassette-player", label: "Cassette Player", checked: false },
    { id: "fog-lights", label: "Fog Lights", checked: false },
    { id: "leather-seats", label: "Leather Seats", checked: false },
    { id: "roof-rack", label: "Roof Rack", checked: false },
    { id: "dvd-player", label: "DVD Player", checked: false },
    { id: "power-mirrors", label: "Power Mirrors", checked: false },
    { id: "power-sunroof", label: "Power Sunroof", checked: false },
    { id: "aux-audio-in", label: "Aux Audio In", checked: false },
    { id: "brush-guard", label: "Brush Guard", checked: false },
    { id: "air-conditioning", label: "Air Conditioning", checked: false },
    { id: "performance-tyres", label: "Performance Tyres", checked: false },
    { id: "premium-sound", label: "Premium Sound System", checked: false },
    { id: "heat", label: "Heat", checked: false },
    { id: "vhs-player", label: "VHS Player", checked: false },
    { id: "offroad-kit", label: "Off-Road Kit", checked: false },
    { id: "am-fm-radio", label: "AM/FM Radio", checked: false },
    { id: "moonroof", label: "Moonroof", checked: false },
    { id: "racing-seats", label: "Racing Seats", checked: false },
    { id: "premium-paint", label: "Premium Paint", checked: false },
    { id: "spoiler", label: "Spoiler", checked: false },
    { id: "power-windows", label: "Power Windows", checked: false },
    { id: "sunroof", label: "Sunroof", checked: false },
    { id: "climate-control", label: "Climate Control", checked: false },
    { id: "parking-sensors", label: "Parking Sensors", checked: false },
    { id: "rear-view-camera", label: "Rear View Camera", checked: false },
    { id: "keyless-entry", label: "Keyless Entry", checked: false },
    { id: "offroad-tyres", label: "Off-Road Tyres", checked: false },
    { id: "satellite-radio", label: "Satellite Radio", checked: false },
    { id: "power-seats", label: "Power Seats", checked: false },
  ]);

  const handleTechnicalFeatureChange = (id: string, checked: boolean) => {
    setTechnicalFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, checked } : feature
      )
    );
  };

  const handleExtraChange = (id: string, checked: boolean) => {
    setExtras((prev) =>
      prev.map((extra) => (extra.id === id ? { ...extra, checked } : extra))
    );
  };

  const visibleTechnicalFeatures = showAllTechnical
    ? technicalFeatures
    : technicalFeatures.slice(0, 6);
  const visibleExtras = showAllExtras ? extras : extras.slice(0, 4);

  return (
    <div>
      <Header color="black" />
      <div className="grid my-auto place-items-center pt-20">
        <div className="w-full max-w-2xl bg-transparent rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-black/70 uppercase text-center">
              Car Details Form
            </h1>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    Form submitted successfully! Your car details have been
                    saved.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{submitError}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-6">
                {/* Make Selection */}
                <div className="space-y-2">
                  <Label htmlFor="make" className="text-sm text-gray-500">
                    Select Make
                  </Label>
                  <Controller
                    name="make"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value > 0 ? field.value.toString() : ""}
                        onValueChange={(value) => {
                          field.onChange(Number(value));
                          setValue("model", 0); // reset model when make changes
                        }}
                      >
                        <SelectTrigger
                          className={`w-full h-12 border-black/10 rounded-md py-8 ${
                            errors.make ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select Make" />
                        </SelectTrigger>
                        <SelectContent>
                          {isMakesLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading...
                            </SelectItem>
                          ) : (
                            makes?.map((make: any) => (
                              <SelectItem
                                key={make.id}
                                value={make.id.toString()}
                              >
                                {make.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.make && (
                    <p className="text-red-500 text-sm">
                      {errors.make.message}
                    </p>
                  )}
                </div>

                {/* Model Selection */}
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-sm text-gray-500">
                    Model
                  </Label>
                  <Controller
                    name="model"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value > 0 ? field.value.toString() : ""}
                        onValueChange={(value) => field.onChange(Number(value))}
                        disabled={!watchedMake || watchedMake === 0}
                      >
                        <SelectTrigger
                          className={`w-full h-12 border-black/10 rounded-md py-8 ${
                            errors.model ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select Model" />
                        </SelectTrigger>
                        <SelectContent>
                          {isModelsLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading...
                            </SelectItem>
                          ) : (
                            models?.map((model: any) => (
                              <SelectItem
                                key={model.id}
                                value={model.id.toString()}
                              >
                                {model.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.model && (
                    <p className="text-red-500 text-sm">
                      {errors.model.message}
                    </p>
                  )}
                </div>

                {/* Year and Mileage Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-sm text-gray-500">
                      Year
                    </Label>
                    <Controller
                      name="year"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={`w-full h-12 border-black/10 rounded-md py-8 ${
                              errors.year ? "border-red-500" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.year && (
                      <p className="text-red-500 text-sm">
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage" className="text-sm text-gray-500">
                      Mileage
                    </Label>
                    <Controller
                      name="mileage"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="mileage"
                          type="number"
                          placeholder="50000"
                          className={`h-12 border-black/10 rounded-md py-8 ${
                            errors.mileage ? "border-red-500" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.mileage && (
                      <p className="text-red-500 text-sm">
                        {errors.mileage.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Engine and Gearbox Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="engine" className="text-sm text-gray-500">
                      Engine
                    </Label>
                    <Controller
                      name="engine"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={`w-full h-12 border-black/10 rounded-md py-8 ${
                              errors.engine ? "border-red-500" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select engine" />
                          </SelectTrigger>
                          <SelectContent>
                            {engineTypes.map((engine) => (
                              <SelectItem key={engine} value={engine}>
                                {engine}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.engine && (
                      <p className="text-red-500 text-sm">
                        {errors.engine.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gearbox" className="text-sm text-gray-500">
                      Gearbox
                    </Label>
                    <Controller
                      name="gearbox"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={`w-full h-12 border-black/10 rounded-md py-8 ${
                              errors.gearbox ? "border-red-500" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select gearbox" />
                          </SelectTrigger>
                          <SelectContent>
                            {gearboxTypes.map((gearbox) => (
                              <SelectItem key={gearbox} value={gearbox}>
                                {gearbox}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.gearbox && (
                      <p className="text-red-500 text-sm">
                        {errors.gearbox.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Fuel Type */}
                <div className="space-y-2">
                  <Label htmlFor="fuel" className="text-sm text-gray-500">
                    Fuel Type
                  </Label>
                  <Controller
                    name="fuelType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={`w-full h-12 border-black/10 rounded-md py-8 ${
                            errors.fuelType ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          {fuelTypes.map((fuel) => (
                            <SelectItem key={fuel} value={fuel}>
                              {fuel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.fuelType && (
                    <p className="text-red-500 text-sm">
                      {errors.fuelType.message}
                    </p>
                  )}
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="bodyColor"
                      className="text-sm text-gray-500"
                    >
                      Exterior Color
                    </Label>
                    <Controller
                      name="bodyColor"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="bodyColor"
                          type="text"
                          placeholder="Grey"
                          className={`h-12 border-black/10 rounded-md py-8 ${
                            errors.bodyColor ? "border-red-500" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.bodyColor && (
                      <p className="text-red-500 text-sm">
                        {errors.bodyColor.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="interiorColor"
                      className="text-sm text-gray-500"
                    >
                      Interior Color
                    </Label>
                    <Controller
                      name="interiorColor"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="interiorColor"
                          type="text"
                          placeholder="White"
                          className={`h-12 border-black/10 rounded-md py-8 ${
                            errors.interiorColor ? "border-red-500" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.interiorColor && (
                      <p className="text-red-500 text-sm">
                        {errors.interiorColor.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end pt-8">
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded cursor-pointer"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Images Upload */}
                <div className="space-y-3">
                  <Label htmlFor="upload" className="text-sm text-gray-500">
                    Uploads
                  </Label>
                  <div className="grid grid-cols-3 gap-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                      <Plus className="w-6 h-6 text-gray-500" />
                      <span className="mt-1 text-sm text-gray-500">Add</span>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {images.map((file, idx) => (
                      <div
                        key={idx}
                        className="relative w-full h-32 rounded-lg overflow-hidden border"
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="Car Image"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full size-[20px] text-xs cursor-pointer hover:bg-black/70"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {errors.images && (
                    <p className="text-red-500 text-sm">
                      {errors.images.message}
                    </p>
                  )}
                </div>
                {/* Price + Sales Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm text-gray-500">
                      Price
                    </Label>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="price"
                          type="number"
                          placeholder="Enter price"
                          className={`h-12 border-black/10 rounded-md py-8 ${
                            errors.price ? "border-red-500" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="salesType"
                      className="text-sm text-gray-500"
                    >
                      Sales Type
                    </Label>
                    <Controller
                      name="salesType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={`w-full h-12 border-black/10 rounded-md py-8 ${
                              errors.salesType ? "border-red-500" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select sales type" />
                          </SelectTrigger>
                          <SelectContent>
                            {salesTypes.map((sale) => (
                              <SelectItem key={sale} value={sale}>
                                {sale}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.salesType && (
                      <p className="text-red-500 text-sm">
                        {errors.salesType.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm text-gray-500"
                  >
                    Description
                  </Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Write a short description about your car..."
                        className={`min-h-[120px] border-black/10 rounded-md ${
                          errors.description ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-6">
                  {/* Technical Features Section */}
                  <div className="border border-border rounded-lg">
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <h2 className="text-gray-500">Technical Features</h2>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowAllTechnical(!showAllTechnical);
                        }}
                        className="flex items-center gap-2 text-sm"
                      >
                        {showAllTechnical ? "Show less" : "Show more"}
                        {showAllTechnical ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {visibleTechnicalFeatures.map((feature) => (
                          <div
                            key={feature.id}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={feature.id}
                              checked={feature.checked}
                              onCheckedChange={(checked) =>
                                handleTechnicalFeatureChange(
                                  feature.id,
                                  checked as boolean
                                )
                              }
                              className="w-5 h-5 transition-all duration-200 cursor-pointer"
                            />
                            <label
                              htmlFor={feature.id}
                              className="text-foreground cursor-pointer select-none text-sm"
                            >
                              {feature.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Extras Section */}
                  <div className="border border-border rounded-lg">
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <h2 className="text-gray-500">Extras</h2>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowAllExtras(!showAllExtras);
                        }}
                        className="flex items-center gap-2 text-sm"
                      >
                        {showAllExtras ? "Show less" : "Show more"}
                        {showAllExtras ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {visibleExtras.map((extra) => (
                          <div
                            key={extra.id}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={extra.id}
                              checked={extra.checked}
                              onCheckedChange={(checked) =>
                                handleExtraChange(extra.id, checked as boolean)
                              }
                              className="w-5 h-5 transition-all duration-200 cursor-pointer"
                            />
                            <label
                              htmlFor={extra.id}
                              className="text-foreground cursor-pointer select-none text-sm"
                            >
                              {extra.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-8">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="px-8 py-3 text-gray-600 hover:text-gray-800 cursor-pointer bg-gray-100 hover:bg-gray-200"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Saving..." : "Submit"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
